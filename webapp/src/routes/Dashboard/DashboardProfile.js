import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import QRCode from 'qrcode.react'
import { useTranslation } from 'react-i18next'

import { useUser } from '../../context/user.context'
import { eosConfig } from '../../config'

const Products = () => {
  const { t } = useTranslation('translations')
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
              <Typography variant="h4">{t('common.account')}</Typography>
              <Typography variant="body1">
                <Link
                  href={`${eosConfig.BLOCK_EXPLORER_URL}account/${profile.account}`}
                  target="_blank"
                  rel="noopener"
                  color="secondary"
                >
                  {profile.account}
                </Link>
              </Typography>
              <QRCode value={profile.account} size={400} />
              <Typography variant="h4">{t('profile.role')}</Typography>
              <Typography variant="body1">{profile.role}</Typography>
              <Typography variant="h4">{t('common.community')}</Typography>
              <Typography variant="body1">
                {profile.communities.join(', ') || 'N/A'}
              </Typography>
              <Typography variant="h4">{t('profile.fullname')}</Typography>
              <Typography variant="body1">{profile.fullname}</Typography>
              <Typography variant="h4">{t('profile.consentStatus')}</Typography>
              <Typography variant="body1">
                {profile.consent ? t('profile.granted') : t('profile.revoked')}
              </Typography>
            </>
          )}
          {!currentUser && (
            <>
              <Typography variant="h4">{t('common.account')}</Typography>
              <Typography variant="body1">{t('profile.guest')}</Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

Products.propTypes = {}

export default Products
