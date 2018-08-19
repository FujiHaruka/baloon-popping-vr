import React from 'react'

/**
 * a-animation を React コンポーネントとして使うための HOC
 * a-animation の attribute を変更した時、一度 DOM を消してから再描画しないと新規アニメーションにならない
 */
function animation (Component) {
  return class Animation extends React.PureComponent {
    constructor (props) {
      super(props)
      this.state = {
        rerendering: false,
      }
    }

    render () {
      return this.state.rerendering ? null : <Component {...this.props} />
    }

    componentWillReceiveProps (prevProps) {
      if (prevProps.status !== this.props.status) {
        this.setState({rerendering: true})
        setTimeout(() => {
          this.setState({rerendering: false})
        }, 10)
      }
    }
  }
}

export default animation
