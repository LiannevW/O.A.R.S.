import React, { PureComponent } from 'react'

export class TrainingContainer extends PureComponent {

  static propTypes = {

    training: PropTypes.shape({
      boat: PropTypes.arrayOf(boatShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.date.isRequired,
      startTime: PropTypes.date.isRequired,
      duration: PropTypes.number.isRequired,
    
      })
  }
