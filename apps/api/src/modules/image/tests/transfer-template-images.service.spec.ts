const mockFileTypeFromBuffer = jest.fn();
jest.mock("file-type", () => ({
  fileTypeFromBuffer: (...args: unknown[]) => mockFileTypeFromBuffer(...args),
}), { virtual: true });

jest.mock("src/utils/question-sanitizer.util", () => ({
  QuestionSanitizer: { extractImageIds: jest.fn() },
}));

import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import { FileInvalidException } from "src/modules/question_image/exceptions";
import { TransferTemplateImagesService } from "../services/transfer-template-images.service";

describe("TransferTemplateImagesService", () => {
  let service: TransferTemplateImagesService;

  const mockImageService = {
    upload: jest.fn(),
  };

  const mockManager = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const extractImageIds = QuestionSanitizer.extractImageIds as jest.Mock;
  const question = { id: 55 } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TransferTemplateImagesService(mockImageService as any);

    mockFileTypeFromBuffer.mockResolvedValue({ mime: "image/png" });
    mockManager.create.mockImplementation((_entity, data) => data);
    mockManager.save.mockImplementation(async (_entity, data) => ({ ...data, id: 900 + data.name.length }));

    global.fetch = jest.fn();
  });

  it("only transfers images actually referenced in the content", async () => {
    extractImageIds.mockReturnValue(["10"]);

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => Buffer.from("bytes").buffer,
    });

    const images = [
      { id: 10, name: "a.png", url: "https://library.example.com/a.png" },
      { id: 11, name: "b.png", url: "https://library.example.com/b.png" },
    ];

    const imageIdMap = await service.transferImages(mockManager as any, 5, question, images, ["<p>content</p>"]);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://library.example.com/a.png");
    expect(imageIdMap.has(10)).toBe(true);
    expect(imageIdMap.has(11)).toBe(false);
  });

  it("downloads, validates, uploads and links each referenced image, building the id map", async () => {
    extractImageIds.mockReturnValue(["10", "20"]);

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => Buffer.from("bytes").buffer,
    });

    const images = [
      { id: 10, name: "a.png", url: "https://library.example.com/a.png" },
      { id: 20, name: "b.png", url: "https://library.example.com/b.png" },
    ];

    const imageIdMap = await service.transferImages(mockManager as any, 5, question, images, ["<p>content</p>"]);

    expect(mockImageService.upload).toHaveBeenCalledTimes(2);
    const [firstCall] = mockImageService.upload.mock.calls;
    expect(firstCall[0].filePath).toMatch(/^question-images\/5\//);
    expect(firstCall[0].fileName).toMatch(/a\.png$/);

    expect(mockManager.create).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ name: "a.png", question, quizId: 5 }),
    );

    expect(imageIdMap.size).toBe(2);
    expect(imageIdMap.get(10)).toBeDefined();
    expect(imageIdMap.get(20)).toBeDefined();
  });

  it("throws when the download fails", async () => {
    extractImageIds.mockReturnValue(["10"]);
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 403 });

    const images = [{ id: 10, name: "a.png", url: "https://library.example.com/a.png" }];

    await expect(
      service.transferImages(mockManager as any, 5, question, images, ["<p>content</p>"]),
    ).rejects.toThrow();

    expect(mockImageService.upload).not.toHaveBeenCalled();
  });

  it("throws FileInvalidException when the downloaded bytes are not a real image", async () => {
    extractImageIds.mockReturnValue(["10"]);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      arrayBuffer: async () => Buffer.from("not an image").buffer,
    });
    mockFileTypeFromBuffer.mockResolvedValueOnce(undefined);

    const images = [{ id: 10, name: "a.png", url: "https://library.example.com/a.png" }];

    await expect(
      service.transferImages(mockManager as any, 5, question, images, ["<p>content</p>"]),
    ).rejects.toBeInstanceOf(FileInvalidException);

    expect(mockImageService.upload).not.toHaveBeenCalled();
  });
});
