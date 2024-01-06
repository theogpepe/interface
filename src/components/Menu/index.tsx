import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@theogpepe/uikit'
import { useWeb3React } from '@web3-react/core'
import { allLanguages } from 'constants/localisation/languageCodes'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import useGetPepePrice from 'utils/useGetPepePrice'
import links from './config'

const Menu: React.FC = (props) => {
  const { account } = useWeb3React();
  const { login, logout } = useAuth();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { isDark, toggleTheme } = useTheme();
  const profile = useGetLocalProfile();
  const pepePriceUsd = useGetPepePrice(); // This now directly returns the price

  return (
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      pepePriceUsd={pepePriceUsd} // If pepePriceUsd is null or undefined, default to 0
      profile={profile}
      {...props}
    />
  );
}

export default Menu;
