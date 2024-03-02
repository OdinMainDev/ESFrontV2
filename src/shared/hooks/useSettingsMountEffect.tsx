/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Config } from '../config/config';
import {
  SettingsPanelConfig,
  useSettingsPanelContext,
} from '@/shared/providers/SettingsPanelProvider';
import { useEffect } from 'react';

const useSettingsMountEffect = (effects: Partial<SettingsPanelConfig>) => {
  const { settingsPanelConfig, setSettingsPanelConfig } = useSettingsPanelContext();
  useEffect(() => {
    setSettingsPanelConfig(effects);
    const undoEffects = Object.keys(effects).reduce((acc, effect) => {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      acc[effect] = settingsPanelConfig[effect as keyof Config];
      return acc;
    }, {} as Partial<SettingsPanelConfig>);
    return () => {
      setSettingsPanelConfig(undoEffects);
    };
  }, []);
};

export default useSettingsMountEffect;
