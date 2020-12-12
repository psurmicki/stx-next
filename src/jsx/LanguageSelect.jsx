import React from 'react';
import Select from 'react-select';
import ISO6391 from 'iso-639-1';
import { Controller } from "react-hook-form";
import '../styles/LangugageSelect.css';

const languageCodes = ['af', 'ar', 'hy', 'bg', 'ca', 'zh', 'hr', 'cs', 'da', 'nl', 'en', 'fi', 'fr', 'de', 'el', 'he', 'hu', 'is', 'id', 'it', 'ja', 'ko', 'lv', 'lt', 'ms', 'no', 'pl', 'ro', 'ru', 'sr', 'sk', 'sl', 'es', 'sv', 'tl', 'th', 'tr', 'uk', 'vi']


export default function LanguageSelect({ control }) {

  const parseLanguageValues = (langCode, idx) => {
    let language = ISO6391.getName(langCode)
    return ({
      id: `${langCode}-${idx}`,
      value: langCode,
      label: `${language}`
    })
  }

  return (
    <div className="Select">
      <label htmlFor="language">Select language</label>
      <Controller
        control={control}
        name="language"
        as={
          <Select
            options={languageCodes.map((langCode, idx) => parseLanguageValues(langCode, idx))}
            isClearable
          />
        }
      />
    </div>
  );
}