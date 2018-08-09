import withData from '../lib/withData'
import App from '../components/App'
import UserList from '../components/UserList'

const UsersPage = withData(props => (
  <App pathname={props.url.pathname}>
    <UserList />
  </App>
))

export default UsersPage
