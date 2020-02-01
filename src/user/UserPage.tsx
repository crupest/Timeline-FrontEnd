import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Theme,
  CircularProgress,
  Typography,
  useTheme,
  makeStyles
} from '@material-ui/core';

import { BaseTimelineInfo } from '../data/timeline';

import Timeline, {
  TimelinePostInfoEx,
  TimelineDeleteCallback
} from '../timeline/Timeline';
import AppBar from '../common/AppBar';
import UserInfoCard from './UserInfoCard';
import TimelinePostEdit, {
  TimelinePostSendCallback
} from '../timeline/TimelinePostEdit';

export interface UserPageProps {
  avatarKey?: string | number;
  timeline?: BaseTimelineInfo;
  posts?: TimelinePostInfoEx[];
  manageable: boolean;
  postable: boolean;
  onManage: () => void;
  onMember: () => void;
  onDelete: TimelineDeleteCallback;
  onPost: TimelinePostSendCallback;
  error?: string;
}

const appBarHeight = 56;
const cardMarginRatio = 1;

const useStyles = makeStyles((theme: Theme) => ({
  fixHeight: {
    flexGrow: 0,
    flexShrink: 0
  },
  topSpace: {
    height: appBarHeight + 'px'
  },
  userInfoCard: {
    margin: theme.spacing(cardMarginRatio),
    width: `calc(100% - ${theme.spacing(cardMarginRatio) * 2}px)`,
    boxSizing: 'border-box',
    position: 'fixed',
    top: appBarHeight,
    zIndex: 1000
  },
  timeline: {
    flex: '1 1 auto'
  }
}));

const UserPage: React.FC<UserPageProps> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const { t } = useTranslation();
  const cardSpaceRef = useRef<HTMLDivElement>(null);
  const bottomSpaceRef = useRef<HTMLDivElement>(null);

  let body: React.ReactElement;

  if (props.error != null) {
    body = <Typography color="error">{t(props.error)}</Typography>;
  } else {
    if (props.timeline != null) {
      let timelineBody: React.ReactElement;
      if (props.posts != null) {
        timelineBody = (
          <Timeline
            className={classes.timeline}
            avatarKey={props.avatarKey}
            posts={props.posts}
            onDelete={props.onDelete}
          />
        );
        if (props.postable) {
          timelineBody = (
            <>
              {timelineBody}
              <div ref={bottomSpaceRef} className={classes.fixHeight} />
              <TimelinePostEdit
                onPost={props.onPost}
                onHeightChange={height => {
                  if (bottomSpaceRef.current) {
                    bottomSpaceRef.current.style.height = height + 'px';
                  }
                }}
              />
            </>
          );
        }
      } else {
        timelineBody = <CircularProgress />;
      }
      body = (
        <>
          <UserInfoCard
            avatarKey={props.avatarKey}
            className={classes.userInfoCard}
            timeline={props.timeline}
            manageable={props.manageable}
            onManage={props.onManage}
            onMember={props.onMember}
            onHeight={height => {
              if (cardSpaceRef.current) {
                cardSpaceRef.current.style.height =
                  height + theme.spacing(cardMarginRatio) + 'px';
              }
            }}
          />
          <div ref={cardSpaceRef} className={classes.fixHeight} />
          {timelineBody}
        </>
      );
    } else {
      body = <CircularProgress />;
    }
  }

  return (
    <>
      <AppBar />
      <div className={clsx(classes.fixHeight, classes.topSpace)} />
      {body}
    </>
  );
};

export default UserPage;