import { StyleSheet } from "react-native";
import { theme } from "../Theme/color";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginBottom: 12,
    paddingHorizontal: 7,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.divider,
    backgroundColor: theme.surface,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: theme.atractive,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "900",
    color: theme.inkMuted,
    textTransform: "uppercase",
  },
  tabLabelActive: {
    color: theme.surface,
    fontWeight: "900",
  },
});
