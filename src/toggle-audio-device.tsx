import { getPreferenceValues, showHUD } from "@raycast/api";
import { getDefaultOutputDevice, getOutputDevices, setDefaultOutputDevice } from "./audio-device";

export default async () => {
  const { builtinOnly } = getPreferenceValues<Preferences>();
  const current = await getDefaultOutputDevice();
  const allDevices = await getOutputDevices();
  const devices = allDevices.filter((d) => {
    if (builtinOnly) {
      return d.transportType === "builtin";
    }
    return true;
  });
  const index = devices.findIndex((d) => d.id === current.id);
  const selectedDevice = devices[(index + 1) % devices.length];
  await setDefaultOutputDevice(selectedDevice.id);
  await showHUD(`Active output audio device set to ${selectedDevice.name}`);
};
