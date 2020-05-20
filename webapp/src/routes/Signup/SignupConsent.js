import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    maxHeight: 400,
    overflow: 'scroll',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

const SignupConsent = ({ onSubmit }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit
        leo quis iaculis commodo. Praesent elit sapien, faucibus a tincidunt
        eget, sagittis convallis metus. Cras in sapien eu ipsum maximus
        venenatis nec sit amet arcu. Integer ut eros quis tortor feugiat
        tincidunt. Etiam sed elit tellus. Cras euismod malesuada lectus in
        eleifend. Donec quis pharetra odio. Fusce ultricies in magna et euismod.
        Donec nisl sapien, vulputate varius vestibulum vitae, iaculis nec neque.
        Curabitur sem ante, vestibulum eget tincidunt eu, congue posuere lacus.
        Sed et facilisis leo, sed pellentesque felis. Sed rhoncus mollis risus
        vel venenatis. Nulla non ullamcorper quam. Etiam dapibus, augue sed
        laoreet pulvinar, arcu tortor accumsan magna, dictum ultricies nulla leo
        vel ligula. Quisque vehicula nulla vitae imperdiet posuere. Praesent
        pellentesque quam in commodo sodales. Curabitur at tortor sed nibh
        consequat lobortis non sit amet leo. Maecenas vitae venenatis diam.
        Etiam ultricies dapibus augue, in venenatis enim pellentesque vel.
        Mauris vulputate malesuada lacus, et scelerisque dolor fringilla ac.
        Etiam semper diam eget ligula auctor placerat. Sed dapibus risus in nisi
        pretium bibendum. Nullam ipsum urna, porttitor id magna a, mollis
        aliquam nulla. Morbi mollis mauris at nulla egestas, non varius augue
        lobortis. Sed tempus arcu eget convallis sollicitudin. Morbi mollis
        tortor vel porta varius. Nam aliquet metus nibh, non semper nulla rutrum
        quis. Nam tempus leo id erat lobortis, vitae luctus ligula consectetur.
        Etiam metus mauris, pellentesque et sem sed, accumsan ultricies augue.
        Etiam sed facilisis orci. Ut eu sapien malesuada, posuere tortor
        aliquet, cursus neque. Sed libero diam, venenatis vitae risus posuere,
        accumsan tempus quam. Phasellus blandit risus nec mi molestie, ac cursus
        lectus maximus. Phasellus tempus mi a justo feugiat, at tempor ex porta.
        Cras ullamcorper, magna id faucibus blandit, nunc lorem egestas augue, a
        fermentum diam arcu non magna. Nulla non ipsum odio. Proin sit amet elit
        tristique, semper odio in, maximus metus. Maecenas efficitur, velit ut
        accumsan laoreet, eros augue vestibulum libero, et convallis diam leo ac
        ligula. Aliquam nec elit a ante molestie lacinia ut sed lacus. Nunc
        congue, justo id interdum scelerisque, arcu tortor varius risus, ac
        cursus velit augue non leo. Ut semper magna eget lectus aliquam iaculis.
        Vestibulum ut mauris placerat orci hendrerit ultricies eget in nibh. In
        quis sapien ultrices, fringilla eros finibus, ultricies nunc. Proin
        lobortis erat sit amet elit lacinia hendrerit. Interdum et malesuada
        fames ac ante ipsum primis in faucibus. Etiam et sem elementum,
        elementum enim vel, elementum dui. Morbi vel diam et augue consequat
        rhoncus. Duis ac semper massa. Praesent porta viverra arcu eu venenatis.
        Donec accumsan libero tincidunt ipsum luctus, et porttitor leo
        tristique. Suspendisse mattis dictum posuere. Etiam aliquet dui orci,
        sed suscipit tortor iaculis eget. Vivamus venenatis eros vitae viverra
        condimentum.
      </div>
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Agree
      </Button>
    </>
  )
}

SignupConsent.propTypes = {}

SignupConsent.defaultProps = {}

export default SignupConsent
