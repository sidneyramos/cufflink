import { Fragment } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const UserInfo = ({ data: { loading, error, userAccounts } }) => {
  if (error) return <h1>Error loading author.</h1>
  if (!loading) {
    console.log(userAccounts)
    return (
      <Fragment>
        {userAccounts.map(user => {
          return (
            <div className='author' key={user.id}>
              <div className='info-header'>
                <img
                  alt={user.name}
                  src={`https://media.graphcms.com/resize=w:100,h:100,fit:crop/${user.avatar.handle}`}
                />
                <Link prefetch href={`/profile?slug=${user.id}`} as={`/profile/${user.id}`}>
                  <a>
                    <h1>{user.name}</h1>
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
        <style jsx>{`
          .author {
            margin-bottom: 72px;
          }
          .info-header {
            text-align: center;
          }
          img {
            height: 120px;
            width: auto;
          }
        `}</style>
      </Fragment>
    )
  }
  return <h2>Loading author...</h2>
}

export const userAccounts = gql`
  query allUsers {
    userAccounts {
      id
      name
      biography
      avatar {
        handle
      }
      connections {
        connectedUser {
          name
        }
      }
      connectedTo {
        owner {
          name
        }
      }
    }
  }
`

export default graphql(userAccounts)(UserInfo)
