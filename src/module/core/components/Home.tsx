import {IO, List} from "@matiassambrizzi/app-utils"
import {Button, Card, CardActions, CardContent, Grid, Stack, Typography} from "@mui/material"
import {ReactNode} from "react"

export const Home = () => {
  return (
    <GridContainer>

      <GridItem>
        <AppCard />
      </GridItem>

      <GridItem>
        <AppCard />
      </GridItem>

      <GridItem>
        <AppCard />
      </GridItem>

      <GridItem>
        <AppCard />
      </GridItem>

    </GridContainer>
  )
}


const GridContainer = (
  props: {
    children: ReactNode
  }
) => <Grid 
    container 
    children={props.children} 
    spacing={2} 
    justifyContent={"center"} 
    padding={4}
  />

const GridItem = (
  props: {
    children: ReactNode
  }
) => <Grid item children={props.children} xs={12} sm={6} md={4}/>


const AppCard = (
  props: {
    title?: string
    onClick?: IO<void>
  }
) => {
  return (
    <Card sx={{minWidth: 300}}>
      <CardContent>
        <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
          {props.title ?? "Default title"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          onClick={props.onClick}
        >
          Go
        </Button>
      </CardActions>
    </Card>
  )



}
