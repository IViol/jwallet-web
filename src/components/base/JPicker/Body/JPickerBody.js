// @flow strict

import * as React from 'react'
import classNames from 'classnames'

import { JIcon } from 'components/base'

import jPickerBodyStyle from './jPickerBody.m.scss'

type RendererProps = {
  +isOpen: boolean,
  +isDisabled: boolean,
}

type Props = {|
  +isOpen: boolean,
  +isDisabled: boolean,
  +className: string,
  +currentRenderer: ?((props: RendererProps) => React$Node),
  +onOpen: (e: SyntheticFocusEvent<HTMLDivElement>) => any,
  +onClose: (e: SyntheticFocusEvent<HTMLDivElement>) => any,
  +children: ?React$Node,
|}

function JPickerBody({
  isOpen,
  isDisabled,
  className,
  currentRenderer,
  onOpen,
  onClose,
  children,
}: Props) {
  const currentEl = !currentRenderer ? null : currentRenderer({
    isOpen,
    isDisabled,
  })

  return (
    <div
      className={classNames(
        jPickerBodyStyle.core,
        isOpen && jPickerBodyStyle.active,
        isDisabled && jPickerBodyStyle.disabled,
        className,
      )}
    >
      <div className={jPickerBodyStyle.select}>
        <div
          onClick={isDisabled
            ? undefined
            : isOpen
              ? onClose
              : onOpen}
          className={jPickerBodyStyle.current}
        >
          {currentEl}
          <div className={jPickerBodyStyle.chevron}>
            <JIcon
              name={isOpen
                ? 'chevron-up-use-fill'
                : 'chevron-down-use-fill'}
              color='blue'
            />
          </div>
        </div>
        <div onClick={onClose} className={jPickerBodyStyle.options}>
          {children}
        </div>
      </div>
      {isOpen && <div onClick={onClose} className={jPickerBodyStyle.overlay} />}
    </div>
  )
}

JPickerBody.defaultProps = {
  isDisabled: false,
  isOpen: false,
  className: '',
}

export { JPickerBody }
