import { iconRegistry } from "@/assets/icons/iconRegistry";
import { colors } from "@/constants/theme/colors";
import { Image } from "expo-image";

type IconProps = {
  name: keyof typeof iconRegistry;
  focused?: boolean;
  size?: number;
  color?: string;
};

export const Icon = ({
  name,
  focused = false,
  size = 24,
  color = colors.primary,
}: IconProps) => {
  const iconSource = focused
    ? iconRegistry[name].fill
    : iconRegistry[name].outline;

  return (
    <Image
      source={iconSource}
      style={{ width: size, height: size, tintColor: color }}
    />
  );
};
