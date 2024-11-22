import Box from "@mui/material/Box";

export default function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={`transition-opacity duration-300 ${
        value === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {value === index && (
        <Box className="p-6 bg-white shadow-lg rounded-md border border-gray-200">
          <div className="flex flex-col gap-4">{children}</div>
        </Box>
      )}
    </div>
  );
}
