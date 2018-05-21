import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { size } from 'lodash';
import { shape, number, string, func, objectOf } from 'prop-types';

import TweetsActions from './TweetRedux';

const propTypes = {
  tweetsNotYetLive: number.isRequired,
  postTweet: func.isRequired,
  tweets: objectOf(shape({ id: number, tweet: string })),
};

const defaultProps = {
  tweets: {},
};

class Tweet extends PureComponent {
  constructor(props) {
    super(props);

    const id = size(props.tweets) + 1;

    this.state = { id, tweet: '' };

    this.updateTweetText = this.updateTweetText.bind(this);
    this.handlePostTweet = this.handlePostTweet.bind(this);
  }

  updateTweetText(tweet) { this.setState({ tweet }); }

  componentWillReceiveProps(nextProps) {
    const tweetsSize = size(nextProps.tweets);

    if (tweetsSize > size(this.props.tweets)) {
      this.setState({ id: tweetsSize + 1, tweet: '' });
    }
  }

  handlePostTweet() {
    const { id, tweet } = this.state;

    this.props.postTweet(id, tweet);
  }

  render() {
    const {
      mainContainer,
      headerContainer,
      headerTextStyle,
      textInputContainer,
      textInputStyle,
      buttonContainer,
      buttonStyle,
      buttonTextStyle,
      pendingTweetContainer,
    } = styles;

    return (
      <View style={mainContainer}>
        <View style={headerContainer}>
          <Text style={headerTextStyle}>Offline Tweeting</Text>
        </View>
        <View style={textInputContainer}>
          <TextInput
            editable
            multiline
            style={textInputStyle}
            onChangeText={this.updateTweetText}
            value={this.state.tweet}
            placeholder="What's happening?"
            maxLength={280}
          />
        </View>
        <View style={buttonContainer}>
          <TouchableOpacity
            onPress={this.handlePostTweet}
            hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          >
            <View style={buttonStyle}>
              <Text style={buttonTextStyle}>Tweet</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={pendingTweetContainer}>
          <Text>{`Tweets not yet live: ${this.props.tweetsNotYetLive}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8F5FD',
  },
  headerContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#A4D9F9',
  },
  headerTextStyle: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
  textInputContainer: {
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#A4D9F9',
    height: 100,
    backgroundColor: 'white',
  },
  textInputStyle: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginRight: 30,
  },
  buttonStyle: {
    width: 70,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#4AB3F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: '700',
  },
  pendingTweetContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});

Tweet.propTypes = propTypes;
Tweet.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    tweets: state.tweet.tweets,
    tweetsNotYetLive: state.tweet.pendingTweetPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postTweet: (id, tweet) => dispatch(TweetsActions.postTweet(id, tweet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
