import { Body4, styled } from '@horizontal-org/shira-ui';
import { FunctionComponent, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  tags: string[];
};

const TAG_GAP_PX = 8;

export const QuizCardTags: FunctionComponent<Props> = ({ tags }) => {
  const [visibleTagCount, setVisibleTagCount] = useState(tags.length);
  const tagRowRef = useRef<HTMLDivElement>(null);
  const ellipsisMeasureRef = useRef<HTMLSpanElement>(null);
  const tagMeasureRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    if (!tags.length) {
      setVisibleTagCount(0);
      return;
    }

    const updateVisibleTags = () => {
      const availableWidth = tagRowRef.current?.clientWidth ?? 0;
      const ellipsisWidth = ellipsisMeasureRef.current?.offsetWidth ?? 0;
      const tagWidths = tags.map((_, index) => tagMeasureRefs.current[index]?.offsetWidth ?? 0);

      if (!availableWidth || tagWidths.some((width) => width === 0)) {
        setVisibleTagCount(tags.length);
        return;
      }

      const totalWidth = tagWidths.reduce((sum, width) => sum + width, 0)
        + TAG_GAP_PX * Math.max(0, tags.length - 1);

      if (totalWidth <= availableWidth) {
        setVisibleTagCount(tags.length);
        return;
      }

      let nextVisibleCount = 0;
      let usedWidth = 0;

      for (let index = 0; index < tagWidths.length; index += 1) {
        const gapBeforeTag = nextVisibleCount > 0 ? TAG_GAP_PX : 0;
        const remainingTagCount = tagWidths.length - (index + 1);
        const reservedEllipsisWidth = remainingTagCount > 0
          ? TAG_GAP_PX + ellipsisWidth
          : 0;

        if (usedWidth + gapBeforeTag + tagWidths[index] + reservedEllipsisWidth > availableWidth) {
          break;
        }

        usedWidth += gapBeforeTag + tagWidths[index];
        nextVisibleCount += 1;
      }

      setVisibleTagCount(Math.max(0, nextVisibleCount));
    };

    updateVisibleTags();

    const resizeObserver = new ResizeObserver(() => {
      updateVisibleTags();
    });

    if (tagRowRef.current) {
      resizeObserver.observe(tagRowRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [tags]);

  const hasOverflowingTags = visibleTagCount < tags.length;
  const visibleTags = hasOverflowingTags
    ? tags.slice(0, visibleTagCount)
    : tags;

  return (
    <TagArea>
      <TagRow ref={tagRowRef}>
        {visibleTags.map((tag, index) => (
          <TagChip key={`${tag}-${index}`}>
            <Body4>{tag}</Body4>
          </TagChip>
        ))}

        {hasOverflowingTags && (
          <TagChip>
            <Body4>...</Body4>
          </TagChip>
        )}
      </TagRow>

      <MeasureRow aria-hidden="true">
        {tags.map((tag, index) => (
          <TagChip
            key={`${tag}-${index}`}
            ref={(node) => {
              tagMeasureRefs.current[index] = node;
            }}
          >
            <Body4>{tag}</Body4>
          </TagChip>
        ))}

        <TagChip ref={ellipsisMeasureRef}>
          <Body4>...</Body4>
        </TagChip>
      </MeasureRow>
    </TagArea>
  );
};

const TagArea = styled.div`
  position: relative;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  color: ${props => props.theme.colors.blue7};
  min-width: 0;
  overflow: hidden;
`;

const MeasureRow = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
  inset: 0 auto auto 0;
  height: 0;
  overflow: hidden;
  display: flex;
  gap: 8px;
`;

const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  padding: 2px 4px 4px 4px;
  border: 1px solid ${props => props.theme.colors.blue4};
  border-radius: 2px;
  background: ${props => props.theme.colors.light.white};
  line-height: 1;
`;
