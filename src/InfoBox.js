import React from 'react'
import { CardContent, Typography, Card } from '@material-ui/core'

function InfoBox({title,cases,total}) {
    return (
        <Card className="info"> 
            <CardContent>
             
             <Typography className="info__title" color="textPrimary"  > {title}  </Typography>
                
             <h4 className="info__cases"> {cases} Today </h4>
          <Typography className="info__total" color="textPrimary"  > Total: {total} </Typography>
  
            </CardContent>
             
         </Card>
    )
}

export default InfoBox
