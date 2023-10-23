import { Button } from "@mui/material"
import './CustomButton.css';

const CustomButton = ({text}) => {
  return (
    <Button
      sx={{
        borderRadius: 3.5,
        bgcolor: "#366a19",
        mt: 1,
        pr: 3,
        pl:3
      }}
      className="custom-button"
      variant="contained"
    >
      {text}
    </Button>
  )
}

export { CustomButton }