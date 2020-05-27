import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import QRCode from 'qrcode.react'

import { useUser } from '../../context/user.context'

const Products = () => {
  const [currentUser] = useUser()
  const profile = {}
  const loading = false

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          {loading && <CircularProgress />}
          {currentUser && profile && (
            <>
              <Typography variant="h4">Account</Typography>
              <Typography variant="body1">
                <Link
                  href={`https://jungle.bloks.io/account/${profile.account}`}
                  target="_blank"
                  rel="noopener"
                  color="secondary"
                >
                  {profile.account}
                </Link>
              </Typography>
              <QRCode value={profile.account} size={400} />
              <Typography variant="h4">Role</Typography>
              <Typography variant="body1">{profile.role}</Typography>
              <Typography variant="h4">Community</Typography>
              <Typography variant="body1">
                {profile.comunities.join(', ') || 'N/A'}
              </Typography>
              <Typography variant="h4">Fullname</Typography>
              <Typography variant="body1">{profile.fullname}</Typography>
              <Typography variant="h4">Consent status</Typography>
              <Typography variant="body1">
                {profile.consent ? 'Granted' : 'Revoked'}
              </Typography>
            </>
          )}
          {!currentUser && (
            <>
              <Typography variant="h4">Account</Typography>
              <Typography variant="body1">Guest</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
