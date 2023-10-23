import { Button } from "@mui/material"
import './CustomButton.css';

const CustomButton = ({text}) => {
  return (
    <Button
      sx={{
        borderRadius: 4,
        bgcolor: "#366a19",
        mt: 1,
        pr: 3,
        pl:3,
        fontSize: 14
      }}
      className="custom-button"
      variant="contained"
    >
      {text}
    </Button>
  )
}

export { CustomButton }