import { Body3, styled } from "@shira/ui";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { FaChevronRight } from "react-icons/fa6";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineMenuBook } from "react-icons/md";

export const QuizLibraryBreadcrumbs: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <BreadcrumbsContainer aria-label="Breadcrumb">
      <BreadcrumbButton type="button" onClick={() => navigate("/library")}>
        <MdOutlineMenuBook size={20} />
        <Body3>{t("library.title")}</Body3>
      </BreadcrumbButton>

      <BreadcrumbSeparator>
        <FaChevronRight size={14} />
      </BreadcrumbSeparator>

      <ActiveBreadcrumb aria-current="page">
        <LuNotepadText size={20} />
        <Body3>{t("library.cards.quizzes.title")}</Body3>
      </ActiveBreadcrumb>
    </BreadcrumbsContainer>
  );
};

const BreadcrumbsContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const BreadcrumbButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: ${props => props.theme.colors.dark.mediumGrey};
  cursor: pointer;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    color: ${props => props.theme.colors.dark.darkGrey};
  }
`;

const ActiveBreadcrumb = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 2px solid ${props => props.theme.colors.green7};
  color: ${props => props.theme.colors.green7};

  svg {
    flex-shrink: 0;
  }
`;

const BreadcrumbSeparator = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.dark.mediumGrey};
`;
