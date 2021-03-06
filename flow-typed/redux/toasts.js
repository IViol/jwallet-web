// @flow strict

/**
 * base - The simplest type of toast. Text message that should be disappeared after few seconds
 * closeable - Text message that will not be disappeared automatically
 * controls - Text message with actions. Labels & payload for dispatch are passed as array
 */
declare type ToastType = 'base' | 'closeable' | 'controls'
declare type ToastControlsPosition = 'left' | 'center' | 'right'

declare type ToastControlPayload = {|
  +payload: any,
  +type: string,
|}

declare type ToastControl = {|
  +payload: ToastControlPayload,
  +label: string,
  +icon?: string,
|}

declare type ToastOptions = {|
  +type: ToastType,
  +controls?: ToastControl[],
  +controlsPosition?: ToastControlsPosition,
|}

declare type ToastData = {|
  +message: string,
  +options: ToastOptions,
|}

declare type ToastsState = {|
  +data: ?ToastData,
|}
