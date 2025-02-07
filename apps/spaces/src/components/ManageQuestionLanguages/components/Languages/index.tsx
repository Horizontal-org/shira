import { FunctionComponent, useState } from "react";
import { Select } from "../../../Select";
import { ControlledSelect } from "../../../ControlledSelect";
import { filterExplanationsByCode } from "../../utils/explanations";
import StyledContent from "../StyledContent";

interface Props {
  translations: any;
  languages: any;
  explanations: any;
}

const getLang = (translations, l) => {
  console.log("🚀 ~ file: index.tsx:11 ~ getLang ~ l:", l)
  const translation = translations.find(t => t.languageId.code === l)
  console.log("🚀 ~ file: index.tsx:13 ~ getLang ~ translation:", translation)
  return translation ? translation.content : '<p>no translation</p>'
}
 
export const Languages: FunctionComponent<Props> = ({
  translations,
  languages,
  explanations
}) => {
  
  const [lang, handleLang] = useState({
    value: 'es',
    label: 'Spanish'
  })

  return (
    <div>
      <div>
        <ControlledSelect
          onChange={(v) => {
            handleLang(v)
          }}
          selected={lang}
          options={languages.map((l) => {
            return {
              value: l.code,
              label: l.name,
            }
          })}
        />
      </div>

      <h5>Question</h5>
      {translations.length > 0 && (
        <StyledContent dangerouslySetInnerHTML={{
          __html: getLang(translations, lang.value)
        }}></StyledContent>
      )}

      <h5>Explanations</h5>
      <StyledContent>
        <div>
          { filterExplanationsByCode(explanations, lang.value) }
        </div>
      </StyledContent>
    </div>
  )
}
