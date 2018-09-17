// @flow

import React from 'react'

import WalletHeader from 'components/WalletHeader'
import { JThumbnail, JRaisedButton } from 'components/base'

const NotFoundView = ({ goToIndex }: Props) => (
  <div className='not-found-view'>
    <WalletHeader />
    <div className='content'>
      <JThumbnail
        color='white'
        image='man'
        title='404. Page not found'
        description={'All user data, including imported or generated ' +
          'private keys are stored locally, meaning your private'}
      />
      <JRaisedButton
        onClick={goToIndex}
        color='blue'
        label='Go to the front'
        isWide
      />
    </div>
  </div>
)

type Props = {
  goToIndex: Function,
}

export default NotFoundView