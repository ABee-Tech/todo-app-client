import React, { useEffect, useState } from "react";
import "./Settings.css";
import Navigation from "../../components/Navigation/Navigation";
import { Heading, HeadingWithoutAction } from "src/styles/styles";
import { Switch } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store/store";
import {
  fetchSettings,
  updateSettings,
} from "src/redux/actions/setting.actions";
import { ETheme } from "@types";

const Settings: React.ReactNode = () => {
  const dispatch = useDispatch();

  const {
    data: { theme },
  } = useSelector((state: RootState) => state.setting);
  const isDarkModeEnabled = theme === ETheme.DARK;

  const onThemeChange = (isDark: boolean) => {
    dispatch(
      updateSettings({
        data: {
          theme: isDark ? ETheme.DARK : ETheme.LIGHT,
        },
      })
    );
  };

  useEffect(() => {
    dispatch(fetchSettings());
  }, []);
  return (
    <Navigation>
      <HeadingWithoutAction className="mb-4">
        <Heading className="uppercase">Settings</Heading>
      </HeadingWithoutAction>
      <div>
        <div
          className={
            "width-full bg-slate-50 dark:bg-slate-900 flex justify-between items-center rounded-lg shadow-md my-2 p-5"
          }
        >
          <p className={`text-sm font-bold leading-none`}>Enable dark mode</p>
          <div>
            <Switch
              checked={theme === ETheme.DARK}
              onChange={onThemeChange}
              className={`${
                isDarkModeEnabled ? "bg-darkblue-700" : "bg-gray-400"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  isDarkModeEnabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default Settings;
