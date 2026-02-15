import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../i18n/LanguageSwitcher';

export default function Home() {
    const { t } = useTranslation();
  return (
    <>
        <div>
            <h1>
                {t("welcome") }
            </h1>
            <LanguageSwitcher/>
        </div>
    </>
  )
}
