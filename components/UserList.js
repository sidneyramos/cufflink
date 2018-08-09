import { Fragment } from 'react'
import Link from 'next/link'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Slider from 'react-slick'

const UserInfo = ({ data: { loading, error, userAccounts } }) => {
  if (error) return <h1>Error loading author.</h1>
  if (!loading) {
    console.log(userAccounts)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Fragment>
        <Slider {...settings} className="user-slider">
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
        </Slider>
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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
