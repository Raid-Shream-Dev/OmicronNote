import { StyleSheet } from "react-native";
import { theme } from "../Theme/color";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "rgba(17,17,17,0.98)",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    borderRadius: 13,
  },
  tabButtonActive: {
    backgroundColor: theme.atractive,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: theme.inkMuted,
  },
  tabLabelActive: {
    color: theme.surface,
    fontWeight: "900",
  },
});
