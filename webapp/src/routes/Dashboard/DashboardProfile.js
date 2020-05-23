import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import { useUser } from '../../context/user.context'

const Products = () => {
  const [currentUser] = useUser()

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h4">Account</Typography>
          <Typography variant="body1">
            {currentUser && (
              <Link
                href={`https://jungle.bloks.io/account/${currentUser?.account}`}
                target="_blank"
                rel="noopener"
                color="secondary"
              >
                {currentUser?.account}
              </Link>
            )}
            {!currentUser && 'Guest'}
          </Typography>
          <Typography variant="h4">Role</Typography>
          <Typography variant="body1">
            {currentUser?.role || 'Guest'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
