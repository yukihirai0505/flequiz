module.exports = {
  getUsers: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/users'
  },
  deleteUser: {
    config: {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/users/:id'
  },
  getMe: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/users/me'
  },
  updateMe: {
    config: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/users/me'
  },
  getExamCategories: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exam_categories'
  },
  createExamCategory: {
    config: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exam_categories'
  },
  editExamCategory: {
    config: {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exam_categories/:id'
  },
  getExams: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exams'
  },
  getExamById: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exams/:id?is_random=:isRandom'
  },
  editExam: {
    config: {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exams/:id'
  },
  createExam: {
    config: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exams'
  },
  createExamTakeUser: {
    config: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exam_take_users'
  },
  getExamTakeUsersByUser: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/exam_take_users/user'
  },
  getRanking: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/v1/ranking'
  }
}