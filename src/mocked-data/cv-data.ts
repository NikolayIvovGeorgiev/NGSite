import { CVInterface } from "../entities/cvInterfaces";
const CVList: CVInterface[] = [
  {
  id: 1,
  note: 'my first CV',
  settings: { },
  data: {
    personalInfo: {
      linkedin: "https://www.linkedin.com/in/nikolay-georgiev-348aa8130/",
      city: "Sofia",
      email: "nikolay.ivov.georgiev@gmail.com",
      phone: "35988515898"
    },
    sections: {
      leftCol : [
        {
        id: '2345',
        type: 'Text-field',
        title: 'Education',
        state: 'old',
        data: {
          config: {},
          content: [
            {
              title: "Bachelor - Ecology and Environmental Management",
              subtitle: "New Bulgarian University"
            },
            {
              title: "Secondary education - Advanced learning of Russian and English",
              subtitle: "125 SOU “Boyan Penev” - Foreign Languages"
            }
          ]
        }
      },
      {
        id: 'ergtuh3',
        type: 'Text-field',
        title: 'Internship',
        state: 'old',
        data: {
          config: {},
          content: undefined
        }
      },
      {
        id: 'wejrfiewr',
        type: 'Progress-bar',
        title: 'Skills',
        state: 'old',
        data: {
          config: {
            color: 'blue'
          },
          content: [
            {
              id : 0,
              title: 'Development literacy (Jira, Java, JavaScript, CSS, HTML)',
              level: 3
            },
            {
              id : 1,
              title: 'Software testing',
              level: 2
            },
            {
              id : 2,
              title: 'Work with regulations and complex documentation',
              level: 3
            },
            {
              id : 3,
              title: 'Ability to work in a team',
              level: 5
            },
            {
              id: 4,
              title: 'Strategic Planning and Project Management',
              level: 3
            }
          ]
        }

      },{
        id: '',
        type: 'Progress-bar',
        title: 'Test skills',
        state: '',
        data: {
          config: {},
          content: [
            { title: '', level: undefined},
            { title: '', level: undefined},
            { title: '', level: undefined}
          ]
        }

      },
      {
        id: '345j',
        type: 'Text-field',
        title: 'Experience',
        state: 'old',
        data: {
          config: {
            dateColumn: true
          },
          content: [
            {
                startDate: "2019-09",
                endDate: "2021-12",
                title: 'Technical Manager',
                subtitle: 'Acoustic Force',
                list: [
                  "TODO", "TODO", "TODO"
                ],
                description: undefined,
              },
            {
                startDate: "2019-09",
                endDate: "2021-12",
                title: 'Ecologist',
                subtitle: 'BKS Kremikovci 98',
                list: [
                  "Management of waste collection processes.", "Negotiating environmental service contacts.", "Management of work teams for the implementation of waste management contacts.",
                  "Preparation of annual reports, completion of accounting books and creating environmental reports.", "Working with regulations and related waste management programs."
                ],
              },
            {
              startDate: "2019-01",
              endDate: "2021-09",
              title: 'Ecologist',
              subtitle: 'Annes 96 for Lufthansa Technik Sofia',
              list: [
                "Organize, monitor and control the waste separation and storage process.", "Provide training for LTSF and cleaning personnel to properly dispose, collect, separate and store waste.", "Organization of temporary storage sites. Filling and maintaining up-to-date accounting records for the available separated waste."
              ]
            },
            // {
            //     startDate: "2018-04",
            //     endDate: "2018-11",
            //     title: 'Administrative Assistant',
            //     subtitle: 'Software University LTD',
            //     list: [
            //         "Implementation of CRM strategy to create a long-term mutually beneficial customer relationships.",
            //         " Answering to customer questions, received through the communication channels.",
            //         "Administration of communication platforms.",
            //         " Creation of statement and analytical documents"
            //     ]
            //   },
            //   {
            //     startDate: "2017-04",
            //     endDate: "2017-11",
            //     title: 'Executor advertising projects',
            //     subtitle: 'Ad Spot LTD',
            //     list: [
            //       " Implementation of internal and external advertising projects", "Working with clients and organizing promotions", "Solving problems and cases of a technical or other nature"
            //     ]
            //   },
            //   {
            //     startDate: "2016-02",
            //     endDate: "2017-04",
            //     title: 'Dispatcher',
            //     subtitle: 'Carrier Commercial Refrigeration Bulgaria',
            //     list: [
            //       "Monitoring of air conditioning systems and  coordination of service teams", "Signal creation and related activities in ERP-SAP(MM+LE)", "Supporting transport organizing activities"
            //     ]
            //   },
            //   {
            //     startDate: "2011-06",
            //     endDate: "2012-01",
            //     title: 'Seller consultant “Stock loans”',
            //     subtitle: 'Unicredit Consumer Financing',
            //     list: [
            //       "Presentation of credit products and concluding contracts with customers for commodity loans", "Presentation of credit related insurance products and insurance policies."
            //     ]
            //   },
          ]
        }
      },
      {
        id: 'wegh345o',
        type: 'Text-field',
        title: 'Projects',
        state: 'old',
        data: {
          config: {},
          content: [
            {
              subtitle: "Video Game Discovery App",
              description: "TODO."
            },
            {
              subtitle: "Functional Testing Onebook.bg",
              description: "Partly manual validating of the system against functional requirements."
            },
            {
              subtitle: "VR Escape room (Unity) ",
              description: "Design of complete virtual reality scenario including floor plans, walkthrough, puzzles, traps, story, etc."
            },
            {
              subtitle: "AR role-playing board game (Unity)",
              description: "Design of an augmented reality game based on a D&D adventures. Establishment of all functional specifications, UI/UX, story, game flow, schedules and all supporting documentation."
            },
            {
              subtitle: "Functional & Exploratory testing in uTest",
              description: "Participating in crowd testing for Healthcare & Fitness - Mobile application"
            },
            {
              subtitle: "Use of bioenergy from composting systems for heating purposes",
              description: "Design and creation of heating system, using unconventional energy source - aerobic process of biodegradation. The system’s goal is to reduce the resources that are used for heating and fertilization of the farming cultures"
            },
            {
              subtitle: "Utilization of plastic products",
              description: "Designing and participating in the creation of a system for utilization of plastic packaging in the input resource for 3D printers (filament) for 3D printers."
            },
            {
              subtitle: "Volunteering in EVS",
              description: "Participation in agricultural eco project 'EVS LIVING GARDEN' in Paks, Hungary.Organic farming and related activities. Implementation of sustainable systems development for conservation of species and the habitats that they require."
            },
          ]
        }
      },
      {
        id: 'ewirugt3',
        type: 'Text-field',
        title: 'Certificates',
        state: 'old',
        data: {
          config: {},
          content: [
            {
                title:"React: Intermediate Topics",
                description: "TODO"
            },
            {
                title:"React 18 for Beginners",
                description: "TODO"
            },
            {
                title:"Automated Testing (Foundation Level)",
                description: "Basic practical and theoretical knowledge for writing automated tests using Java and Selenium"
            },
            {
                title:"Quality Assurance Course",
                description: "Рrinciples of software testing "
            },
            {
                title:"User Experience Design Essentials",
                description: "UI Design, User Interface, User Experience design, UX design & Web Design"
            },
          ]
        }
      },
      {
        id: 'tgi435g',
        type: 'Pie-Chart',
        title: 'Free Time',
        state: 'old',
        data: {
          config: {},
          content: [
            {
              title: "Sport",
              percent: 30
            },
            {
              title: "Woodcarving",
              percent: 10
            },
            {
              title: "Gaming",
              percent: 20
            },
            {
              title: "Reading",
              percent: 20
            },
            {
              title: "Hiking",
              percent: 20
            },
          ]
        }
      }],
      rightCol: [
      {
        id: '234hu',
        type: 'Progress-bar',
        title: 'Languages',
        state: 'old',
        data: {
          config: { },
          content: [
            {
              title: 'English',
              level: 4
            },
            {
              title: 'Russian',
              level: 3
            }
          ]
        }
      },],
    }              
  }
  },
];
  
  export default CVList;
  