import {  InfoPayload } from '@/models/info'
import { ClassPayload } from '@/models/class'
import { StudentPayload } from '@/models/student'
export interface QuestionSubject {
  id: number
  code: string
  name: string
  courseIds: number[]
}
export interface QuestionComment {
  id: number
  content: string
  upvoteNumber: number
  downVoteNumber: number
  parentComment: string
  student: StudentPayload
  question: {
    id: number
    content: string
    student: any
    forum: {
      id: number
      name: string
      code: string
      type: 'SUBJECT'
      subject: {
        id: number
        name: string
        code: 'Toan'
        courses: [
          {
            id: number
            name: string
            code: string
            title: string
            description: string
            isActive: true
            grade: 'TEN'
            subject: string
            teacherCourses: [string]
            classes: [string]
            resource: string
          }
        ]
        categoryMoodleId: number
        forums: [string]
        accountDetailSubjects: [
          {
            id: {
              accountDetailId: number
              subjectId: number
            }
            accountDetail: string
            subject: string
          }
        ]
        infoFindTutorSubjects: [
          {
            id: {
              infoFindTutorId: number
              subjectId: number
            }
            infoFindTutor: string
            subject: string
          }
        ]
      }
      forumLessons: [
        {
          id: number
          lessonName: string
          forum: string
          questions: [string]
        }
      ]
      questions: [string]
      getaClazz: {
        id: number
        name: string
        code: string
        status: 'NEW'
        startDate: '2number22-12-2numberTnumber2:35:number4.682Z'
        endDate: '2number22-12-2numberTnumber2:35:number4.682Z'
        course: {
          id: number
          name: string
          code: string
          title: string
          description: string
          isActive: true
          grade: 'TEN'
          subject: string
          teacherCourses: [string]
          classes: [string]
          resource: string
        }
        account: string
        studentClasses: [string]
        feedBacks: [
          {
            id: {
              postId: number
              resourceId: number
            }
            student: string
            course: {
              id: number
              name: string
              code: string
              title: string
              description: string
              isActive: true
              grade: 'TEN'
              subject: string
              teacherCourses: [string]
              classes: [string]
              resource: string
            }
            clazz: string
            content: string
            geteEvaluateType: string
          }
        ]
        numberStudent: number
        maxNumberStudent: number
        minNumberStudent: number
        classLevel: 'TEN'
        classType: 'ONE'
        unitPrice: number
        finalPrice: number
        timeTables: [
          {
            id: number
            date: '2number22-12-2numberTnumber2:35:number4.682Z'
            slotNumber: number
            clazz: string
            archetypeTime: {
              id: number
              archetype: {
                id: number
                name: string
                code: string
                createdByTeacherId: number
                archetypeTimes: [string]
              }
              dayOfWeek: {
                id: number
                name: string
                code: 'MONDAY'
                archetypeTimes: [string]
              }
              slot: {
                id: number
                name: string
                code: 'SLOT1'
                startTime: string
                endTime: string
                archetypeTimes: [string]
              }
              timeTables: [string]
            }
            archetypeTimes: [
              {
                id: number
                archetype: {
                  id: number
                  name: string
                  code: string
                  createdByTeacherId: number
                  archetypeTimes: [string]
                }
                dayOfWeek: {
                  id: number
                  name: string
                  code: 'MONDAY'
                  archetypeTimes: [string]
                }
                slot: {
                  id: number
                  name: string
                  code: 'SLOT1'
                  startTime: string
                  endTime: string
                  archetypeTimes: [string]
                }
                timeTables: [string]
              }
            ]
            attendances: [
              {
                id: number
                timeTable: string
                present: true
              }
            ]
          }
        ]
        resourceMoodleId: number
        forums: [string]
        image: {
          id: number
          url: string
          name: string
          resourceType: 'AVATAR'
          postResources: [
            {
              id: {
                postId: number
                resourceId: number
              }
              post: {
                id: number
                name: string
                title: string
                brief: string
                content: string
                createBy: '2number22-12-2numberTnumber2:35:number4.682Z'
                createDate: '2number22-12-2numberTnumber2:35:number4.682Z'
                account: string
                postResources: [string]
                postCategories: [
                  {
                    id: number
                    name: string
                    description: string
                    post: string
                  }
                ]
              }
              resource: string
            }
          ]
          accounts: [string]
          course: [
            {
              id: number
              name: string
              code: string
              title: string
              description: string
              isActive: true
              grade: 'TEN'
              subject: string
              teacherCourses: [string]
              classes: [string]
              resource: string
            }
          ]
          accountDetail: string
        }
        sections: [
          {
            id: number
            clazz: string
            name: string
            modules: [
              {
                id: number
                section: string
                name: string
                url: string
                type: 'QUIZ'
              }
            ]
            visible: true
          }
        ]
        candicates: [
          {
            id: number
            clazz: string
            teacher: string
            status: 'APPLYING'
          }
        ]
        active: true
      }
    }
    upvoteNumber: number
    downVoteNumber: number
    comments: [
      {
        id: number
        content: string
        upvoteNumber: number
        downVoteNumber: number
        subComments: [string]
        parentComment: string
        account: string
        question: string
      }
    ]
    forumLesson: {
      id: number
      lessonName: string
      forum: string
      questions: [string]
    }
    closed: true
  }
}
export interface Question {
  id: number
  content: string
  student: StudentPayload
  subject: QuestionSubject
  upvoteNumber: number
  downVoteNumber: number
  comments: Comment[]
  closed: boolean
}
export interface GetAClassCourse {
  id: number
  image: string
  courseTitle: string
  courseName: string
  subject: {
    id: number
    code: 'Toan'
    name: string
    courseIds: [number]
  }
  totalClass: number
}
export interface GetAClassTeacher {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  birthday: '2number22-12-2numberTnumber2:35:number4.68numberZ'
  introduce: string
  phoneNumber: string
  role: {
    id: number
    name: string
    code: 'TEACHER'
  }
  gender: {
    code: string
    name: string
  }
  avatar: string
  active: true
}
export interface GetAClass {
  id: number
  name: string
  code: string
  status: string
  classType: string
  classLevel: string
  startDate: string
  endDate: string
  numberStudent: number
  maxNumberStudent: number
  minNumberStudent: number
  course: GetAClassCourse
  unitPrice: number
  finalPrice: number
  teacher: GetAClassTeacher
}
export interface ForumLessonDtosQuestion {
  id: number
  content: string
  student: {
    id: number
    username: string
    firstName: string
    lastName: string
    email: string
    birthday: '2number22-12-2numberTnumber2:35:number4.678Z'
    introduce: string
    phoneNumber: string
    role: {
      id: number
      name: string
      code: 'TEACHER'
    }
    gender: {
      code: string
      name: string
    }
    avatar: string
    active: true
  }
  subject: {
    id: number
    code: 'Toan'
    name: string
    courseIds: [number]
  }
  upvoteNumber: number
  downVoteNumber: number
  comments: [
    {
      id: number
      content: string
      upvoteNumber: number
      downVoteNumber: number
      parentComment: string
      student: {
        id: number
        username: string
        firstName: string
        lastName: string
        email: string
        birthday: '2number22-12-2numberTnumber2:35:number4.678Z'
        introduce: string
        phoneNumber: string
        role: {
          id: number
          name: string
          code: 'TEACHER'
        }
        gender: {
          code: string
          name: string
        }
        avatar: string
        active: true
      }
      question: {
        id: number
        content: string
        student: {
          id: number
          username: string
          password: string
          firstName: string
          lastName: string
          email: string
          cvUrl: string
          birthday: '2number22-12-2numberTnumber2:35:number4.678Z'
          introduce: string
          degree: 'SINGLE'
          phoneNumber: string
          gender: 'MALE'
          role: {
            id: number
            name: string
            code: 'TEACHER'
          }
          transactions: [
            {
              id: number
              orderInfo: string
              account: string
              amount: number
              vpnCommand: string
              paymentClass: {
                id: number
                name: string
                code: string
                status: 'NEW'
                startDate: '2number22-12-2numberTnumber2:35:number4.678Z'
                endDate: '2number22-12-2numberTnumber2:35:number4.678Z'
                course: {
                  id: number
                  name: string
                  code: string
                  title: string
                  description: string
                  isActive: true
                  grade: 'TEN'
                  subject: string
                  teacherCourses: [string]
                  classes: [string]
                  resource: string
                }
                account: string
                studentClasses: [string]
                feedBacks: [
                  {
                    id: {
                      postId: number
                      resourceId: number
                    }
                    student: string
                    course: {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                    clazz: string
                    content: string
                    geteEvaluateType: string
                  }
                ]
                numberStudent: number
                maxNumberStudent: number
                minNumberStudent: number
                classLevel: 'TEN'
                classType: 'ONE'
                unitPrice: number
                finalPrice: number
                timeTables: [
                  {
                    id: number
                    date: '2number22-12-2numberTnumber2:35:number4.678Z'
                    slotNumber: number
                    clazz: string
                    archetypeTime: {
                      id: number
                      archetype: {
                        id: number
                        name: string
                        code: string
                        createdByTeacherId: number
                        archetypeTimes: [string]
                      }
                      dayOfWeek: {
                        id: number
                        name: string
                        code: 'MONDAY'
                        archetypeTimes: [string]
                      }
                      slot: {
                        id: number
                        name: string
                        code: 'SLOT1'
                        startTime: string
                        endTime: string
                        archetypeTimes: [string]
                      }
                      timeTables: [string]
                    }
                    archetypeTimes: [
                      {
                        id: number
                        archetype: {
                          id: number
                          name: string
                          code: string
                          createdByTeacherId: number
                          archetypeTimes: [string]
                        }
                        dayOfWeek: {
                          id: number
                          name: string
                          code: 'MONDAY'
                          archetypeTimes: [string]
                        }
                        slot: {
                          id: number
                          name: string
                          code: 'SLOT1'
                          startTime: string
                          endTime: string
                          archetypeTimes: [string]
                        }
                        timeTables: [string]
                      }
                    ]
                    attendances: [
                      {
                        id: number
                        timeTable: string
                        present: true
                      }
                    ]
                  }
                ]
                resourceMoodleId: number
                forums: [string]
                image: {
                  id: number
                  url: string
                  name: string
                  resourceType: 'AVATAR'
                  postResources: [
                    {
                      id: {
                        postId: number
                        resourceId: number
                      }
                      post: {
                        id: number
                        name: string
                        title: string
                        brief: string
                        content: string
                        createBy: '2number22-12-2numberTnumber2:35:number4.678Z'
                        createDate: '2number22-12-2numberTnumber2:35:number4.678Z'
                        account: string
                        postResources: [string]
                        postCategories: [
                          {
                            id: number
                            name: string
                            description: string
                            post: string
                          }
                        ]
                      }
                      resource: string
                    }
                  ]
                  accounts: [string]
                  course: [
                    {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                  ]
                  accountDetail: string
                }
                sections: [
                  {
                    id: number
                    clazz: string
                    name: string
                    modules: [
                      {
                        id: number
                        section: string
                        name: string
                        url: string
                        type: 'QUIZ'
                      }
                    ]
                    visible: true
                  }
                ]
                candicates: [
                  {
                    id: number
                    clazz: string
                    teacher: string
                    status: 'APPLYING'
                  }
                ]
                active: true
              }
              transactionNo: string
              success: true
            }
          ]
          teacherCourses: [
            {
              id: {
                teachId: number
                courseId: number
              }
              account: string
              course: {
                id: number
                name: string
                code: string
                title: string
                description: string
                isActive: true
                grade: 'TEN'
                subject: string
                teacherCourses: [string]
                classes: [string]
                resource: string
              }
              isAllowed: true
            }
          ]
          studentClasses: [
            {
              id: {
                studentId: number
                classId: number
              }
              account: string
              getaClass: {
                id: number
                name: string
                code: string
                status: 'NEW'
                startDate: '2number22-12-2numberTnumber2:35:number4.678Z'
                endDate: '2number22-12-2numberTnumber2:35:number4.678Z'
                course: {
                  id: number
                  name: string
                  code: string
                  title: string
                  description: string
                  isActive: true
                  grade: 'TEN'
                  subject: string
                  teacherCourses: [string]
                  classes: [string]
                  resource: string
                }
                account: string
                studentClasses: [string]
                feedBacks: [
                  {
                    id: {
                      postId: number
                      resourceId: number
                    }
                    student: string
                    course: {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                    clazz: string
                    content: string
                    geteEvaluateType: string
                  }
                ]
                numberStudent: number
                maxNumberStudent: number
                minNumberStudent: number
                classLevel: 'TEN'
                classType: 'ONE'
                unitPrice: number
                finalPrice: number
                timeTables: [
                  {
                    id: number
                    date: '2number22-12-2numberTnumber2:35:number4.678Z'
                    slotNumber: number
                    clazz: string
                    archetypeTime: {
                      id: number
                      archetype: {
                        id: number
                        name: string
                        code: string
                        createdByTeacherId: number
                        archetypeTimes: [string]
                      }
                      dayOfWeek: {
                        id: number
                        name: string
                        code: 'MONDAY'
                        archetypeTimes: [string]
                      }
                      slot: {
                        id: number
                        name: string
                        code: 'SLOT1'
                        startTime: string
                        endTime: string
                        archetypeTimes: [string]
                      }
                      timeTables: [string]
                    }
                    archetypeTimes: [
                      {
                        id: number
                        archetype: {
                          id: number
                          name: string
                          code: string
                          createdByTeacherId: number
                          archetypeTimes: [string]
                        }
                        dayOfWeek: {
                          id: number
                          name: string
                          code: 'MONDAY'
                          archetypeTimes: [string]
                        }
                        slot: {
                          id: number
                          name: string
                          code: 'SLOT1'
                          startTime: string
                          endTime: string
                          archetypeTimes: [string]
                        }
                        timeTables: [string]
                      }
                    ]
                    attendances: [
                      {
                        id: number
                        timeTable: string
                        present: true
                      }
                    ]
                  }
                ]
                resourceMoodleId: number
                forums: [string]
                image: {
                  id: number
                  url: string
                  name: string
                  resourceType: 'AVATAR'
                  postResources: [
                    {
                      id: {
                        postId: number
                        resourceId: number
                      }
                      post: {
                        id: number
                        name: string
                        title: string
                        brief: string
                        content: string
                        createBy: '2number22-12-2numberTnumber2:35:number4.679Z'
                        createDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                        account: string
                        postResources: [string]
                        postCategories: [
                          {
                            id: number
                            name: string
                            description: string
                            post: string
                          }
                        ]
                      }
                      resource: string
                    }
                  ]
                  accounts: [string]
                  course: [
                    {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                  ]
                  accountDetail: string
                }
                sections: [
                  {
                    id: number
                    clazz: string
                    name: string
                    modules: [
                      {
                        id: number
                        section: string
                        name: string
                        url: string
                        type: 'QUIZ'
                      }
                    ]
                    visible: true
                  }
                ]
                candicates: [
                  {
                    id: number
                    clazz: string
                    teacher: string
                    status: 'APPLYING'
                  }
                ]
                active: true
              }
              enrollDate: '2number22-12-2numberTnumber2:35:number4.679Z'
              is_enrolled: true
              aclass: {
                id: number
                name: string
                code: string
                status: 'NEW'
                startDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                endDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                course: {
                  id: number
                  name: string
                  code: string
                  title: string
                  description: string
                  isActive: true
                  grade: 'TEN'
                  subject: string
                  teacherCourses: [string]
                  classes: [string]
                  resource: string
                }
                account: string
                studentClasses: [string]
                feedBacks: [
                  {
                    id: {
                      postId: number
                      resourceId: number
                    }
                    student: string
                    course: {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                    clazz: string
                    content: string
                    geteEvaluateType: string
                  }
                ]
                numberStudent: number
                maxNumberStudent: number
                minNumberStudent: number
                classLevel: 'TEN'
                classType: 'ONE'
                unitPrice: number
                finalPrice: number
                timeTables: [
                  {
                    id: number
                    date: '2number22-12-2numberTnumber2:35:number4.679Z'
                    slotNumber: number
                    clazz: string
                    archetypeTime: {
                      id: number
                      archetype: {
                        id: number
                        name: string
                        code: string
                        createdByTeacherId: number
                        archetypeTimes: [string]
                      }
                      dayOfWeek: {
                        id: number
                        name: string
                        code: 'MONDAY'
                        archetypeTimes: [string]
                      }
                      slot: {
                        id: number
                        name: string
                        code: 'SLOT1'
                        startTime: string
                        endTime: string
                        archetypeTimes: [string]
                      }
                      timeTables: [string]
                    }
                    archetypeTimes: [
                      {
                        id: number
                        archetype: {
                          id: number
                          name: string
                          code: string
                          createdByTeacherId: number
                          archetypeTimes: [string]
                        }
                        dayOfWeek: {
                          id: number
                          name: string
                          code: 'MONDAY'
                          archetypeTimes: [string]
                        }
                        slot: {
                          id: number
                          name: string
                          code: 'SLOT1'
                          startTime: string
                          endTime: string
                          archetypeTimes: [string]
                        }
                        timeTables: [string]
                      }
                    ]
                    attendances: [
                      {
                        id: number
                        timeTable: string
                        present: true
                      }
                    ]
                  }
                ]
                resourceMoodleId: number
                forums: [string]
                image: {
                  id: number
                  url: string
                  name: string
                  resourceType: 'AVATAR'
                  postResources: [
                    {
                      id: {
                        postId: number
                        resourceId: number
                      }
                      post: {
                        id: number
                        name: string
                        title: string
                        brief: string
                        content: string
                        createBy: '2number22-12-2numberTnumber2:35:number4.679Z'
                        createDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                        account: string
                        postResources: [string]
                        postCategories: [
                          {
                            id: number
                            name: string
                            description: string
                            post: string
                          }
                        ]
                      }
                      resource: string
                    }
                  ]
                  accounts: [string]
                  course: [
                    {
                      id: number
                      name: string
                      code: string
                      title: string
                      description: string
                      isActive: true
                      grade: 'TEN'
                      subject: string
                      teacherCourses: [string]
                      classes: [string]
                      resource: string
                    }
                  ]
                  accountDetail: string
                }
                sections: [
                  {
                    id: number
                    clazz: string
                    name: string
                    modules: [
                      {
                        id: number
                        section: string
                        name: string
                        url: string
                        type: 'QUIZ'
                      }
                    ]
                    visible: true
                  }
                ]
                candicates: [
                  {
                    id: number
                    clazz: string
                    teacher: string
                    status: 'APPLYING'
                  }
                ]
                active: true
              }
            }
          ]
          teacherClass: [
            {
              id: number
              name: string
              code: string
              status: 'NEW'
              startDate: '2number22-12-2numberTnumber2:35:number4.679Z'
              endDate: '2number22-12-2numberTnumber2:35:number4.679Z'
              course: {
                id: number
                name: string
                code: string
                title: string
                description: string
                isActive: true
                grade: 'TEN'
                subject: string
                teacherCourses: [string]
                classes: [string]
                resource: string
              }
              account: string
              studentClasses: [string]
              feedBacks: [
                {
                  id: {
                    postId: number
                    resourceId: number
                  }
                  student: string
                  course: {
                    id: number
                    name: string
                    code: string
                    title: string
                    description: string
                    isActive: true
                    grade: 'TEN'
                    subject: string
                    teacherCourses: [string]
                    classes: [string]
                    resource: string
                  }
                  clazz: string
                  content: string
                  geteEvaluateType: string
                }
              ]
              numberStudent: number
              maxNumberStudent: number
              minNumberStudent: number
              classLevel: 'TEN'
              classType: 'ONE'
              unitPrice: number
              finalPrice: number
              timeTables: [
                {
                  id: number
                  date: '2number22-12-2numberTnumber2:35:number4.679Z'
                  slotNumber: number
                  clazz: string
                  archetypeTime: {
                    id: number
                    archetype: {
                      id: number
                      name: string
                      code: string
                      createdByTeacherId: number
                      archetypeTimes: [string]
                    }
                    dayOfWeek: {
                      id: number
                      name: string
                      code: 'MONDAY'
                      archetypeTimes: [string]
                    }
                    slot: {
                      id: number
                      name: string
                      code: 'SLOT1'
                      startTime: string
                      endTime: string
                      archetypeTimes: [string]
                    }
                    timeTables: [string]
                  }
                  archetypeTimes: [
                    {
                      id: number
                      archetype: {
                        id: number
                        name: string
                        code: string
                        createdByTeacherId: number
                        archetypeTimes: [string]
                      }
                      dayOfWeek: {
                        id: number
                        name: string
                        code: 'MONDAY'
                        archetypeTimes: [string]
                      }
                      slot: {
                        id: number
                        name: string
                        code: 'SLOT1'
                        startTime: string
                        endTime: string
                        archetypeTimes: [string]
                      }
                      timeTables: [string]
                    }
                  ]
                  attendances: [
                    {
                      id: number
                      timeTable: string
                      present: true
                    }
                  ]
                }
              ]
              resourceMoodleId: number
              forums: [string]
              image: {
                id: number
                url: string
                name: string
                resourceType: 'AVATAR'
                postResources: [
                  {
                    id: {
                      postId: number
                      resourceId: number
                    }
                    post: {
                      id: number
                      name: string
                      title: string
                      brief: string
                      content: string
                      createBy: '2number22-12-2numberTnumber2:35:number4.679Z'
                      createDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                      account: string
                      postResources: [string]
                      postCategories: [
                        {
                          id: number
                          name: string
                          description: string
                          post: string
                        }
                      ]
                    }
                    resource: string
                  }
                ]
                accounts: [string]
                course: [
                  {
                    id: number
                    name: string
                    code: string
                    title: string
                    description: string
                    isActive: true
                    grade: 'TEN'
                    subject: string
                    teacherCourses: [string]
                    classes: [string]
                    resource: string
                  }
                ]
                accountDetail: string
              }
              sections: [
                {
                  id: number
                  clazz: string
                  name: string
                  modules: [
                    {
                      id: number
                      section: string
                      name: string
                      url: string
                      type: 'QUIZ'
                    }
                  ]
                  visible: true
                }
              ]
              candicates: [
                {
                  id: number
                  clazz: string
                  teacher: string
                  status: 'APPLYING'
                }
              ]
              active: true
            }
          ]
          requests: [
            {
              id: number
              title: string
              name: string
              reason: string
              url: string
              account: string
              requestType: {
                id: number
                name: string
                code: 'AVATAR'
                requests: [string]
              }
              status: 'APPROVED'
            }
          ]
          studentAnswers: [
            {
              id: number
              surveyQuestion: {
                id: number
                question: string
                questionType: 'MULTIPLE_CHOICE'
                answers: [
                  {
                    id: number
                    surveyQuestion: string
                    studentAnswers: [string]
                    answer: string
                    visible: true
                  }
                ]
                studentAnswers: [string]
                visible: true
              }
              student: string
              answer: {
                id: number
                surveyQuestion: string
                studentAnswers: [string]
                answer: string
                visible: true
              }
              openAnswer: string
            }
          ]
          keycloakId: string
          questions: [string]
          comments: [
            {
              id: number
              content: string
              upvoteNumber: number
              downVoteNumber: number
              subComments: [string]
              parentComment: string
              account: string
              question: string
            }
          ]
          accountDetail: {
            id: number
            firstName: string
            lastName: string
            birthDay: '2number22-12-2numberTnumber2:35:number4.679Z'
            email: string
            phone: string
            domicile: string
            teachingProvince: string
            voice: string
            currentAddress: string
            idCard: string
            trainingSchoolName: string
            majors: string
            status: 'REQUESTING'
            level: string
            password: string
            account: string
            accountDetailSubjects: [
              {
                id: {
                  accountDetailId: number
                  subjectId: number
                }
                accountDetail: string
                subject: string
              }
            ]
            accountDetailClassLevels: [
              {
                id: {
                  accountDetailId: number
                  classLevelId: number
                }
                accountDetail: string
                classLevel: {
                  id: number
                  name: string
                  code: 'TEN'
                  accountDetailClassLevels: [string]
                }
              }
            ]
            resources: [
              {
                id: number
                url: string
                name: string
                resourceType: 'AVATAR'
                postResources: [
                  {
                    id: {
                      postId: number
                      resourceId: number
                    }
                    post: {
                      id: number
                      name: string
                      title: string
                      brief: string
                      content: string
                      createBy: '2number22-12-2numberTnumber2:35:number4.679Z'
                      createDate: '2number22-12-2numberTnumber2:35:number4.679Z'
                      account: string
                      postResources: [string]
                      postCategories: [
                        {
                          id: number
                          name: string
                          description: string
                          post: string
                        }
                      ]
                    }
                    resource: string
                  }
                ]
                accounts: [string]
                course: [
                  {
                    id: number
                    name: string
                    code: string
                    title: string
                    description: string
                    isActive: true
                    grade: 'TEN'
                    subject: string
                    teacherCourses: [string]
                    classes: [string]
                    resource: string
                  }
                ]
                accountDetail: string
              }
            ]
            gender: 'MALE'
            active: true
          }
          infoFindTutorAccounts: [
            {
              id: {
                infoFindTutorId: number
                teacherId: number
              }
              infoFindTutor: {
                id: number
                fullName: string
                email: string
                phone: string
                address: string
                classLevel: 'TEN'
                description: string
                infoFindTutorAccounts: [string]
                infoFindTutorSubjects: [
                  {
                    id: {
                      infoFindTutorId: number
                      subjectId: number
                    }
                    infoFindTutor: string
                    subject: string
                  }
                ]
              }
              teacher: string
            }
          ]
          fileAttachments: [
            {
              id: number
              name: string
              url: string
              fileType: 'CREATE'
              account: string
            }
          ]
          resource: {
            id: number
            url: string
            name: string
            resourceType: 'AVATAR'
            postResources: [
              {
                id: {
                  postId: number
                  resourceId: number
                }
                post: {
                  id: number
                  name: string
                  title: string
                  brief: string
                  content: string
                  createBy: '2number22-12-2numberTnumber2:35:number4.68numberZ'
                  createDate: '2number22-12-2numberTnumber2:35:number4.68numberZ'
                  account: string
                  postResources: [string]
                  postCategories: [
                    {
                      id: number
                      name: string
                      description: string
                      post: string
                    }
                  ]
                }
                resource: string
              }
            ]
            accounts: [string]
            course: [
              {
                id: number
                name: string
                code: string
                title: string
                description: string
                isActive: true
                grade: 'TEN'
                subject: string
                teacherCourses: [string]
                classes: [string]
                resource: string
              }
            ]
            accountDetail: string
          }
          active: true
        }
        forum: {
          id: number
          name: string
          code: string
          type: 'SUBJECT'
          subject: {
            id: number
            name: string
            code: 'Toan'
            courses: [
              {
                id: number
                name: string
                code: string
                title: string
                description: string
                isActive: true
                grade: 'TEN'
                subject: string
                teacherCourses: [string]
                classes: [string]
                resource: string
              }
            ]
            categoryMoodleId: number
            forums: [string]
            accountDetailSubjects: [
              {
                id: {
                  accountDetailId: number
                  subjectId: number
                }
                accountDetail: string
                subject: string
              }
            ]
            infoFindTutorSubjects: [
              {
                id: {
                  infoFindTutorId: number
                  subjectId: number
                }
                infoFindTutor: string
                subject: string
              }
            ]
          }
          forumLessons: [
            {
              id: number
              lessonName: string
              forum: string
              questions: [string]
            }
          ]
          questions: [string]
          getaClazz: {
            id: number
            name: string
            code: string
            status: 'NEW'
            startDate: '2number22-12-2numberTnumber2:35:number4.68numberZ'
            endDate: '2number22-12-2numberTnumber2:35:number4.68numberZ'
            course: {
              id: number
              name: string
              code: string
              title: string
              description: string
              isActive: true
              grade: 'TEN'
              subject: string
              teacherCourses: [string]
              classes: [string]
              resource: string
            }
            account: string
            studentClasses: [string]
            feedBacks: [
              {
                id: {
                  postId: number
                  resourceId: number
                }
                student: string
                course: {
                  id: number
                  name: string
                  code: string
                  title: string
                  description: string
                  isActive: true
                  grade: 'TEN'
                  subject: string
                  teacherCourses: [string]
                  classes: [string]
                  resource: string
                }
                clazz: string
                content: string
                geteEvaluateType: string
              }
            ]
            numberStudent: number
            maxNumberStudent: number
            minNumberStudent: number
            classLevel: 'TEN'
            classType: 'ONE'
            unitPrice: number
            finalPrice: number
            timeTables: [
              {
                id: number
                date: '2number22-12-2numberTnumber2:35:number4.68numberZ'
                slotNumber: number
                clazz: string
                archetypeTime: {
                  id: number
                  archetype: {
                    id: number
                    name: string
                    code: string
                    createdByTeacherId: number
                    archetypeTimes: [string]
                  }
                  dayOfWeek: {
                    id: number
                    name: string
                    code: 'MONDAY'
                    archetypeTimes: [string]
                  }
                  slot: {
                    id: number
                    name: string
                    code: 'SLOT1'
                    startTime: string
                    endTime: string
                    archetypeTimes: [string]
                  }
                  timeTables: [string]
                }
                archetypeTimes: [
                  {
                    id: number
                    archetype: {
                      id: number
                      name: string
                      code: string
                      createdByTeacherId: number
                      archetypeTimes: [string]
                    }
                    dayOfWeek: {
                      id: number
                      name: string
                      code: 'MONDAY'
                      archetypeTimes: [string]
                    }
                    slot: {
                      id: number
                      name: string
                      code: 'SLOT1'
                      startTime: string
                      endTime: string
                      archetypeTimes: [string]
                    }
                    timeTables: [string]
                  }
                ]
                attendances: [
                  {
                    id: number
                    timeTable: string
                    present: true
                  }
                ]
              }
            ]
            resourceMoodleId: number
            forums: [string]
            image: {
              id: number
              url: string
              name: string
              resourceType: 'AVATAR'
              postResources: [
                {
                  id: {
                    postId: number
                    resourceId: number
                  }
                  post: {
                    id: number
                    name: string
                    title: string
                    brief: string
                    content: string
                    createBy: '2number22-12-2numberTnumber2:35:number4.68numberZ'
                    createDate: '2number22-12-2numberTnumber2:35:number4.68numberZ'
                    account: string
                    postResources: [string]
                    postCategories: [
                      {
                        id: number
                        name: string
                        description: string
                        post: string
                      }
                    ]
                  }
                  resource: string
                }
              ]
              accounts: [string]
              course: [
                {
                  id: number
                  name: string
                  code: string
                  title: string
                  description: string
                  isActive: true
                  grade: 'TEN'
                  subject: string
                  teacherCourses: [string]
                  classes: [string]
                  resource: string
                }
              ]
              accountDetail: string
            }
            sections: [
              {
                id: number
                clazz: string
                name: string
                modules: [
                  {
                    id: number
                    section: string
                    name: string
                    url: string
                    type: 'QUIZ'
                  }
                ]
                visible: true
              }
            ]
            candicates: [
              {
                id: number
                clazz: string
                teacher: string
                status: 'APPLYING'
              }
            ]
            active: true
          }
        }
        upvoteNumber: number
        downVoteNumber: number
        comments: [
          {
            id: number
            content: string
            upvoteNumber: number
            downVoteNumber: number
            subComments: [string]
            parentComment: string
            account: string
            question: string
          }
        ]
        forumLesson: {
          id: number
          lessonName: string
          forum: string
          questions: [string]
        }
        closed: true
      }
    }
  ]
  closed: true
}
export interface ForumLessonDtos {
  id: number
  lessonName: string
  questions: ForumLessonDtosQuestion[]
}
export interface Subject {
  id: number
  code: string
  name: string
  courseIds: Array<number>
}
export interface Forum {
  id: number
  name: string
  code: string
  type: string
  subject: Subject
  forumLessonDtos: ForumLessonDtos
  getaClass: GetAClass
  questions: Question[]
}
