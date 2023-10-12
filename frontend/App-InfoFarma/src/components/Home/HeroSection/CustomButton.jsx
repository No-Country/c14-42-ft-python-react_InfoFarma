import { Button } from "@mui/material"
import './CustomButton.css';
const CustomButton = ({text}) => {
  return (
    <Button
      className="custom-button"
      variant="contained"
    >
      {text}
    </Button>
  )
}

export { CustomButton }