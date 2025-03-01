const PROJECTS = [
    {
        // fonts.local
        id: 1,
        title: "Project 001",
        subtitle: "fonts.local",
        previewImg: "./fontslocalthumb.png",
        previewVideo: "./fontslocal.mp4",

        description: "As a designer, I wanted to transform the perception of graffiti from vandalism to inspiration. Fonts.local is a digital art gallery that showcases the beauty of street typography and stickers located in Vancouver, BC. ",
        notes: "View the current exhibition with 'view project' in the top right!",

        software: "Figma, React, Tailwind, Adobe Dimension, After Effects",
        link: "https://fontsvancouver.madebykevinlazo.com/",

        // New fields
        overview: [
            {
                title: "Features",
                content: "The main feature is an image gallery that goes through a collection of street typography and stickers. Each image has an artist and location. The gallery is designed to be simple and easy to navigate. Navigation is done through clicks."
            },
            {
                title: "Creative Direction",
                content: "This project has the potential to grow into something bigger than a single city, and i'm excited to see what it can become. Eventually I hope to create a platform for people to discover and experience the beauty of street typography from around the world."
            }
        ],

        technical: {
            sections: [
                {
                    title: "Asset Creation and Collection",
                    content: "Image Capture and 3D assets",
                    details: [
                        "Went around the city with geo location on. Spent a few hours every week capturing images of graffiti and stickers.",
                        "Set a goal of 100 images to start the gallery.",
                        "Composed a rotating spray paint can in After Effects. The textures were created in Adobe Dimension."
                    ]
                },
                {
                    title: "Wireframing",
                    content: "Website Composition and design direction",
                    details: [
                        "Prototype with a 6 column grid.",
                        "Selected fonts, image dimensions, and color palette.",
                        "Created a mood board for the website."
                    ]
                },
                {
                    title: "Development",
                    content: "React + Vite Environment, Styled with Tailwind CSS",
                    details: [
                        "Developed with React and Vite for a fast development environment.",
                        "Styled with Tailwind CSS for rapid design iteration.",
                        "Implemented a simple gallery with a modal for image viewing.",
                    ]
                }
            ]
        },

        wireframes: [
            {
                image: "./wireframes/fw1.jpg",
                title: "Initial Landing Page Wireframe",
                description: "An initial impression and the design that is consistent throughout the website.",
                fullSizeImage: "./wireframes/fw1.jpg",
            },
            {
                image: "./wireframes/fw2.jpg",
                title: "Initial Modal View",
                description: "The composition of elements and how they will be rendered in the UI",
                fullSizeImage: "./wireframes/fw2.jpg",
            },
            {
                image: "./wireframes/fw3.jpg",
                title: "Revised Composition",
                description: "Initial layout planning - showing key angles and compositions",
                fullSizeImage: "./wireframes/fw3.jpg",
            },
            {
                image: "./wireframes/fw4.jpg",
                title: "Map View",
                description: "Map is rendered within the image gallery modal.",
                fullSizeImage: "./wireframes/fw4.jpg",
            },
            {
                image: "./wireframes/fw5.jpg",
                title: "Street view concept",
                description: "This would become our user submission model. Due to budget constraints, this feature was not implemented.",
                fullSizeImage: "./wireframes/fw5.jpg",
            }
        ],

        processSteps: [
            {
                label: "Concept",
                description: "Started by gathering these beautiful graffiti pieces and building out a moodboard that felt right for the project.",
                challenges: [
                    "Maintaining authenticity while creating contemporary visuals",
                    "Balancing historical context with modern presentation"
                ],
                solutions: [
                    "Created detailed sketches tailored for each presentation of each piece",
                    "Developed specific composition to center the art pieces in the gallery"
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Comprehensive visual documentation of each piece",
                    "Cohesive aesthetic across varied art styles"
                ]
            },
            {
                label: "Wireframes",
                description: "Moved into Figma to create wireframes for the website.",
                challenges: [
                    "Composition and font choices. The website needed to be simple and easy to navigate. The design needed to be consistent throughout the website.",

                ],
                solutions: [
                    "Created detailed wireframes tailored for the mood of the project",
                    "Used a 6 column grid to create a consistent layout"
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Design direction for the website",
                    "Ability to navigate the website",
                    "Ready to move on to development"
                ]
            },
            {
                label: "Development",
                description: "Moved into VSC to create a React application.",
                challenges: [
                    "Creating a structured data model for the images",
                    "Implementing a simple gallery with a modal for image viewing.",
                    "Styling the website with Tailwind CSS",
                    "Deploying the website to a server",

                ],
                solutions: [
                    "Created a data structure array for the images - containing image, artist, location properties to be rendered in the gallery using the map method.",
                    "Implemented event handlers to open and close the submission modal / map view / go through the image gallery",
                    "Coding the logic to render the images in a random order each time. Preventing images from reappearing on the gallery until each unique ID is used.",
                    "Styled the website using Tailwind CSS, adding my fonts to the tailwind.config.js file.",
                    "Deployed the website to my server using git FTP deploy to a hostinger subdomain."
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "First iteration of the website",
                    "Ability to receive user submissions",
                    "Ready to receive feedback"
                ]
            },
            {
                label: "Quality Assurance",
                description: "Coordinated a 4 week quality assurance test plan with my team of four.",
                challenges: [
                    "Creating test plans / user paths / test cases/ and setting up a Jira Board.",
                    "Writing bug reports.",
                    "Responsive design for mobile and tablet devices.",
                    "Implementing bug fixes, improvements and enhancements.",

                ],
                solutions: [
                    "In week 1, created a Jira board and assigned tasks to each member of the team. I was working with two designers and two developers. I created a test plan, and in this phase laid the foundation. Created test cases, test paths, and user stories, and assigned them to the team.",
                    "In week 2, we began redesigning the website in Figma. Our design team created new UI elements for the website's map view and submission modal. We identified user experience enhancements and began delegating them.",
                    "In week 3, we implemented bug fixes and improvements, and we implemented responsive design for mobile and tablet devices. Conducting user testing to see if the improvements were ready to be deployed.",
                    "In week 4, we implemented the final changes and enhancements. We conducted a final round of user testing to see if the website was ready to be deployed. We deployed the website to the server and it was ready for launch."


                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "UI/UX enhancements to the website",
                    "Resolved user submission bugs",
                    "Component cleanup between the map view and gallery view.",
                ]
            },
            {
                label: "Continuity",
                description: "Future plans and direction for the website.",
                challenges: [
                    "Enhance the website with new graphic elements.",
                    "Collaborate with the design team to create a new UI/UX.",
                    "Expand the gallery with new art pieces. Including graffiti and stickers from other cities.",


                ],
                solutions: [
                    "To be determined, although I have started to gather images from other cities.",
                    "I am in contact with graphic designer to reinvent the design direction of the UI.",



                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "To be determined",
                ]
            },
            // ... other process steps remain the same
        ],

        media: [
            {
                url: "./fontslocal.mp4",
                type: "image",
                caption: "Video Demo"
            },
            {
                url: "./fl1.png",
                type: "image",
                caption: "Landing Page"
            },
            {
                url: "./fl2.png",
                type: "image",
                caption: "Gallery View"
            },
            {
                url: "./fl3.png",
                type: "image",
                caption: "Map View"
            },
            {
                url: "./fl4.png",
                type: "image",
                caption: "User Submisison Modal"
            }
        ]
    },
    {
        // kia mvp
        id: 2,
        title: "Project 002",
        subtitle: "kiamvp",
        previewImg: "./kiamvp.png",
        previewVideo: "./kiamvpraceoptim2.mp4",

        description: "NBA basketball is a core design influence in my style. This year, I wanted to create a 3D concept carousel with the focus of creating informative and interactive content. Who takes the title?",
        notes: "Take a look at the front runners in the 2025 NBA MVP Race with 'view project' in the top right corner!",

        software: "Figma, React, Tailwind, GSAP, After Effects, Illustrator",
        link: "https://kiamvp.madebykevinlazo.com/",

        // New fields
        overview: [
            {
                title: "Features",
                content: "The main feature of the project is the 3D carousel of the top 5 MVP candidates. Each candidate has a 3D model of their team logo and a graphic magazine cover card. The carousel is interactive and can be rotated forward and backward with the arrow buttons."
            },
            {
                title: "Creative Direction",
                content: "This project was inspired by SLAM magazine and NBA JAM. The carousel physics mimic the early NBA games team selection screen. The magazine covers were illustrated in Illustrator. The team logos were rendered and composed in After Effects."
            }
        ],

        technical: {
            sections: [
                {
                    title: "React / GSAP / Tailwind / CSS",
                    content: "This project was created with three of my strengths: React, Tailwind, and CSS ",
                    details: [
                        "Because the map method was something I have used in previous work, I knew that this would be an efficient method for the scope of the work that I was creating. This project is comprised majorly of 3 components and a data file.",
                    ]
                },
                {
                    title: "GSAP",
                    content: "Carousel Animations",
                    details: [
                        "Carousel rotation for a smooth and dynamic experience",
                        "Interactive physics using event handlers on the arrow buttons",
                        "Did not use GSAP for 3D depth because of browser compatibility issues",

                    ]
                },
                {
                    title: "Tailwind CSS and Vanilla CSS",
                    content: "UI elements and Positioning",
                    details: [
                        "The card layout was styled using Tailwind CSS.",
                        "The information sections were styled using Tailwind CSS.",
                        "Initially used GSAP for 3D depth, but had to compromise for browser compatibility. Vanilla CSS is practical, lightweight and works across all browsers. Although it lacks the depth.",
                    ]
                }
            ]
        },

        wireframes: [
            {
                image: "./wireframes/km1.jpeg",
                title: "Shot List Planning",
                description: "Sketch of each player's card layout. This composition has the card with the team logo directly below it. The arrows below are used for navigation",
                fullSizeImage: "./wireframes/km1.jpeg",
            },
            {
                image: "./wireframes/km2.jpeg",
                title: "Physics",
                description: "A reference for how I would like the carousel to function.",
                fullSizeImage: "./wireframes/km2.jpeg",
            },
            {
                image: "./wireframes/km3.jpeg",
                title: "Front View Carousel",
                description: "The desired layout from the front view. Depending on browser compatibility, the carousel may not have the 3D depth of the wireframe.",
                fullSizeImage: "./wireframes/km3.jpeg",
            },
            {
                image: "./wireframes/km4.jpeg",
                title: "Information",
                description: "Planning out the information that will be displayed on the details page. Composing the layout with different sizes of squares. Made notes of the animations",
                fullSizeImage: "./wireframes/km4.jpeg",
            },
            {
                image: "./wireframes/km5.jpeg",
                title: "Initial Notes",
                description: "Notes on the project. Ensuring that I will render the information using the map method. Which means I need to create a data structured array with the same properties. Safari and Firefox handle 3D interactions differently so keep that in mind when testing.",
                fullSizeImage: "./wireframes/km5.jpeg",
            }
        ],

        processSteps: [
            {
                label: "Ideation",
                description: "I have wanted to practice with 3D depth on the web. This idea came naturally because I was following the 2025 NBA season. This idea came to me when I was designing graphic cards for the MVP candidates. But wanted to present them in an interesting way. That's when I thought of the 3D carousel.",
                challenges: [
                    "None at this point, I was excited to work!",
                ],
                solutions: [
                    "None Available",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Moving towards paper sketches which would become wireframes.",

                ]
            },
            {
                label: "Sketches",
                description: "Right away, I could visualize what I had in mind for presentation. I grabbed my notebook and sketched my ideas and initial thoughts to guide me through development.",
                challenges: [
                    "This was not particularly challenging, from experience I have engaged with 3D carousels and knew that it should require depth and a clean layout."
                ],
                solutions: [
                    "Sketches Done! Very minimal wireframe needed.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Direction towards development.",

                ]
            },
            {
                label: "Asset Creation",
                description: "I illustrated magazine covers in Illustrator and composed the team logos in After Effects. ",
                challenges: [
                    "None at all! This was very fun!",


                ],
                solutions: [
                    "This was something I was doing prior to the development of the project as a passion project. Being able to use them in this project was a bonus.",



                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Direction towards development.",

                ]
            },
            {
                label: "Development",
                description: "This was created in a React + Vite environment. Styled with Tailwind and CSS. Tailwind was used for styling the layout, but I used GSAP and CSS for the positioning and creating the 3D depth.",
                challenges: [
                    "Initially, I was using GSAP to create the depth of the 3D cards. In my initial version it was exactly how I wanted it to be laid out. Although during testing, it would prevent users from clicking on the card in Mozilla and Safari browsers.",
                    "Project Data Passage",
                    "Event Handling in a project with 3D depth",

                ],
                solutions: [
                    "I adjusted the cards to be styled with CSS and only used GSAP for the rotation of the cards. I had to compromise my initial version for browser compatibility. I figured this was the most practical solution",
                    "I created the routing from the three components, the home page, the carousel page, and the details page. I had to ensure that the data was being passed correctly and that the carousel was being rendered correctly. Each component except for the home page was being rendered from my playerData.js file.",
                    "I created the information component that would render the information properties from the playersData.js file. I had to make sure that the information was being passed correctly between the pages.",


                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Ready to deploy!",

                ]
            },
            {
                label: "Deployment and Sharing",
                description: "I wanted to share my take on an informative and engaging project. Statistics are just numbers that can be boring to look at, and I think this is a fun way to present them.",
                challenges: [
                    "None at this point, I was ready to deploy.",
                ],
                solutions: [
                    "Deployed to my subdomain using git and FTP deploy method",
                    "Shared my complete work on my LinkedIn!"

                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Community engagement and feedback!",

                ]
            },
            // ... other process steps remain the same
        ],

        media: [
            {
                url: "./kiamvpraceoptim2.mp4",
                type: "image",
                caption: "Video Demonstration"
            },
            {
                url: "./mvp1.png",
                type: "image",
                caption: "Carousel Page"
            },
            {
                url: "./mvp2.png",
                type: "image",
                caption: "Details Page - Video Section"
            },
            {
                url: "./mvp3.png",
                type: "image",
                caption: "Details Page - Stats Section"
            },
            {
                url: "./mvp4.png",
                type: "image",
                caption: "Details Page - Accolades Section"
            }
        ]

    },
    {
        // courtfinder
        id: 3,
        title: "Project 003",
        subtitle: "COURTFINDER+",
        previewImg: "./cf1.png",
        previewVideo: "./courtfinder.mp4",

        description: "As a lifelong basketball fan, I have spent multiple hours locating courts to play on in the summer. I wanted to create a service that solves an issue for basketball players. Courtfinder+ is a web application that allows users to find basketball courts in the lower mainland (for now). My aspiration is to create an international platform for basketball players to find courts in their area. A basketball glossary.",
        notes: "Take a look at outdoor courts with 'view project' in the top right corner!",

        software: "Figma, React, Tailwind, GSAP",
        link: "https://courtfinder.madebykevinlazo.com/",

        // New fields
        overview: [
            {
                title: "Features",
                content: "The main attraction is the basketball court index on the main page. They are categorized with the name, type of court and location. When the user clicks on one of the cards, they are directed to a more detailed page with additional information and location links to locate the court with Google Maps/Apple Maps."
            },
            {
                title: "Creative Direction",
                content: "This project has the potential to grow into something bigger than a single city, and I'm excited to see what it can become. Eventually I hope to create a platform for people to discover and experience the community and culture of basketball in their area. "
            }
        ],

        technical: {
            sections: [
                {
                    title: "Wireframes",
                    content: "About, Details, and Info pages",
                    details: [
                        "5 Column grid layout with consistent spacing and alignment",
                        "Visual hierarchy with clear navigation",
                        "Visual hierarchy with font sizes and colors.",
                        "Inspired by the works of Josef Muller Brockmann - particularly the focus on functionality over aesthetic"
                    ]
                },
                {
                    title: "React and Tailwind",
                    content: "Simple but effective",
                    details: [
                        "Render each court from a courtsData.js file, using the map method.",
                        "Style the mobile breakpoints with Tailwind, depending on the screen size, the grid collapses into a single column.",
                        "Fixed header and footer, with a transparent background.",
                        "Dark mode context provider. Toggles states between light and dark mode.",
                        "Centered the cards to start in the second row and span to the fourth row. Centering them completely between the header and navigation.",
                    ]
                }
            ]
        },

        wireframes: [
            {
                image: "./wireframes/cfw1.png",
                title: "Home Page",
                description: "Header and footer span the entire width of the page. The cards are centered between the header and footer. Cards are centered within the 2nd and 4th columns. Each card layout has the same spacing and alignment. Images are scaled to be proportionate.",
                fullSizeImage: "./wireframes/cfw1.png",
            },
            {
                image: "./wireframes/cfw2.png",
                title: "Details Page",
                description: "Depending on the court, multiple images will be provided on the details page. The images are scaled equally in width, but may be different in height - covering the entire container if possible. The information pertaining to each court takes the first row as a position and is horizontally aligned. Each font size is consistent and adjusts depending on its importance. The importance of the text is determined by the font size and color.",
                fullSizeImage: "./wireframes/cfw2.png",
            },
            {
                image: "./wireframes/cfw3.png",
                title: "Information Pages",
                description: "A static page with no page animations. Follows a UX optimized pattern of reading and should be referred to for all information pages related to courtfinder.",
                fullSizeImage: "./wireframes/cfw3.png",
            },

        ],

        processSteps: [
            {
                label: "Ideation",
                description: "A web application that solves a problem for basketball players in BC. Using my own experience to include key information pertaining to the details of the court and other additional information such as directions.",
                challenges: [
                    "Expansion of courts in the future",
                    "Developing an understanding of cultural significance, and how to present it in the web application."
                ],
                solutions: [
                    "Collected information from basketball courts in BC",
                    "Collected grid layouts in web design to create a similar look and feel",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Clear idea of what I wanted to achieve with this project.",

                ]
            }, {
                label: "Prototyping",
                description: "Using Figma layout grids to compose the position of UI elements. Using Figma to evenly and accurately position the text on the page. Using user experience principles to create an easy navigation system.",
                challenges: [
                    "Research and competitive analysis",
                    "Identify the positioning of UI elements for the most effective scanning experience.",
                    "Identify the position of header and footer, ensuring that user flow is smooth and intuitive. ",
                ],



                solutions: [
                    "Opted for a minimalistic design to bring the users' attention to the courts. Each court has a unique look and feel that could have clashed with the design of the website if I were to use more complex colors and positioning.",
                    "Developed references for text layouts and font sizes for static information pages."
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Ready for development!",

                ]
            },
            {
                label: "Animations",
                description: "Used GSAP to animate reveal animations between pages to enhance user flows and memorability. ",
                challenges: [
                    "Unfamiliar with GSAP",

                ],



                solutions: [
                    "Created a reveal animation between the landing page and the home page. It is inspired by a curtain reveal in theatre. It responds to the context provider and will appear inverted based on the current UI context.",
                    "Created a reveal animation between the home page and details page. It is a traditional page wipe animation. It responds to the context provider and will appear inverted based on the current UI context.",
                    "Used the same wipe transition on the details page but return to the home page - it will enter from the left side, and the wipe will read 'Back to Courts'",

                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Additional animation enhancements that are subtle and refined - to bring another layer of memorability to the project without overshadowing the courts.",
                ]
            },
            {
                label: "Development",
                description: "Developed the website in a React environment. I styled the UI with Tailwind CSS. The website is responsive and has a dark mode context provider.",
                challenges: [
                    "First time coding context provider.",
                    "Identifying inverted CSS styles to work with Tailwind.",
                    "Determining the elements to be inverted in dark mode.",
                ],



                solutions: [
                    "Created a context provider for dark mode. The context provider would toggle between light and dark mode.",
                    "Added dark mode styles to the website. The dark mode styles were created using the inverted CSS styles in tailwind.config.js file. Then applied to the elements that should be inverted when in dark mode.",
                    "Used a structured data array to efficiently render the courts in the gallery. The data array contained the image, name, location, features, and type of court. The data was rendered using the map method.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Functional site, that is pixel perfect to the wireframes that functions as expected. Will be ready for deployment.",
                ]
            },
            {
                label: "Deployment",
                description: "Ready to deploy! Deployed to my subdomain using git and FTP deploy method. Shared my complete work on my LinkedIn!",
                challenges: [
                    "None at all!",
                ],



                solutions: [
                    "None Available",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Site deployed on a subdomain, and shared on my LinkedIn!",
                ]
            },
            // ... other process steps remain the same
        ],

        media: [
            {
                url: "./courtfinder.mp4",
                type: "image",
                caption: "Video Demonstration"
            },
            {
                url: "./cf1.png",
                type: "image",
                caption: "Landing Page"
            },
            {
                url: "./cf2.png",
                type: "image",
                caption: "Home Page"
            },
            {
                url: "./cf3.png",
                type: "image",
                caption: "Details Page"
            },
            {
                url: "./cf4.png",
                type: "image",
                caption: "About Page"
            }
        ]

    },
    {
        //doubleback
        id: 4,
        title: "Project 004",
        subtitle: "Doubleback Concept Store",
        previewImg: "./db1.png",
        previewVideo: "./dbconceptvid.mp4",

        description: "A friend of mine has been exploring the idea of expanding his online business presence. I thought to create a concept store (with his approval) so we could get an idea of what that might look like in the future. Doubleback is an online reselling business on social media that has the potential to expand into a physical store.",
        notes: "Window shop our latest collection with 'view project' in the top right corner!",

        software: "HTML, CSS, JS",
        link: "https://dbconcept.madebykevinlazo.com/",

        // New fields
        overview: [
            {
                title: "Features",
                content: "The doubleback concept store follows a familiar storefront navigation. It has a main page with featured collections, a categories filter, a new arrivals page, an about section and links to social media channels."
            },
            {
                title: "Creative Direction",
                content: "This was a practice in Swiss web design. The focus was functionality and optimized layouts to seamlessly navigate users through their online shopping experiences. The design was inspired by the works of Josef Muller Brockmann - I am reading his book Grid Systems in Graphic Design. The minimal contemporary look of the website is the brand identity of Doubleback and compliments the Swiss design principles."
            }
        ],

        technical: {
            sections: [
                {
                    title: "HTML Structure",
                    content: "The Navbar",
                    details: [
                        "The navbar is a fixed element that is available on all pages at all times. Unless you are on the mobile breakpoint, then it is a hamburger menu. This was an intentional design, giving users the option to navigate the website at all times.",
                    ]
                },
                {
                    title: "The content",
                    content: "Each image on the landing page is styled with CSS grayscale effect. On hover, the images will become colorized. This was to give the user a sense of interaction with the website. Like a reveal. Practicing with grids, the entire design system is consistent across pages. Although the grid layout on each page is varied.",
                    details: [
                        "CSS Hover effects -> Grayscale to Color",
                        "Consistent grid layout across pages, collapses into a single column on mobile",
                        "Code blocks are reused to create a consistent look and continuity across pages"
                    ]
                }
            ]
        },

        wireframes: [
            {
                image: "./wireframes/dbw1.png",
                title: "Landing Page",
                description: "3 column grid, with consistent spacing and alignment. The images are scaled to be proportionate. The images are styled with a grayscale effect. On hover, the images will become colorized.",
                fullSizeImage: "./wireframes/dbw1.png",
            },
            {
                image: "./wireframes/dbw2.png",
                title: "Categories Page",
                description: "2 column grid, that collapses into a single column grid on mobile.",
                fullSizeImage: "./wireframes/dbw2.png",
            },
            {
                image: "./wireframes/dbw3.png",
                title: "Product Page",
                description: "2 column grid, the text is consistently spaced. Collapses into a single column on mobile.",
                fullSizeImage: "./wireframes/dbw3.png",
            },
            {
                image: "./wireframes/dbw4.png",
                title: "About Page",
                description: "2 column grid, to learn about the business and meet the owner.",
                fullSizeImage: "./wireframes/dbw4.png",
            },

        ],

        processSteps: [
            {
                label: "Ideation",
                description: "Client Consultation",
                challenges: [
                    "Maintaining authenticity while creating a contemporary, visually appealing, modern storefront.",
                    "Meeting the client's needs, but also practicing efficient web design."
                ],
                solutions: [
                    "Created a moodboard that determined the design direction of the website.",
                    "Collected references for other web stores that I was inspired by.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Plan to wireframe.",
                    "Can begin the creation process."
                ]
            },
            {
                label: "Wireframes",
                description: "Low fidelity wireframes to determine the structure of the website.",
                challenges: [
                    "Not particularly challenging, however attention to detail was crucial because the webstore was going to be devoid of colors and focus on functionality.",
                ],
                solutions: [
                    "Wireframed code blocks that could be reused across the pages.",
                    "Determined grid layouts using a 6 column grid system on all pages. Adjusted the grid layout on mobile to a single column.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Plan to wireframe.",
                    "Can begin the creation process."
                ]
            },
            {
                label: "Development",
                description: "Creating code blocks for each page to be reused. Creating a universal style sheet for the navbar. Separating the different grid layouts into smaller precise CSS files.",
                challenges: [
                    "Every HTML file is a different page, which was frustrating. I chose to do this to refine my HTML and CSS skills but the drawback was that it took much longer than expected.",
                    "Mobile responsiveness",
                    "Ensuring that each page had their assets and styles linked correctly.",
                    "Managing different stylesheets for different HTML files."
                ],
                solutions: [
                    "There was no solution to a more efficient way to do this, I had to work through it. I made an empty HTML structure for each of the product pages and used that template to make individual pages for each of the categories, and the individual products within those categories. This was a very manual process.",
                    "Decided on a hamburger menu, because the fixed navbar was illogical on mobile. This made it simple to collapse the grid layouts into a single column.",
                    "Ensured that each page had their assets and styles linked correctly. I had to pay close attention to file paths, which meant that I had to revisit my code blocks to make sure that they were correct. This was the most time consuming part of the process.",
                    "Because of the approach I took in development, I had to ensure that all my files were organized so that I could access them quickly."
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Website ready to deploy",
                ]
            },
            {
                label: "Deployment",
                description: "Hosted on a portfolio subdomain. Shared on LinkedIn.",
                challenges: [
                    "None at this point, I was ready to deploy.",
                ],
                solutions: [
                    "Hostinger does great with HTML/CSS based projects. I was able to deploy the website to my subdomain by uploading the files into the Hostinger file manager.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Website deployed and shared on LinkedIn",
                ]
            },
            // ... other process steps remain the same
        ],

        media: [
            {
                url: "./dbconceptvid.mp4",
                type: "image",
                caption: "Video Demonstration"
            },
            {
                url: "./db1.png",
                type: "image",
                caption: "Landing Page"
            },
            {
                url: "./db2.png",
                type: "image",
                caption: "Collections Detailed View"
            },
            {
                url: "./db3.png",
                type: "image",
                caption: "Collections Page"
            },
            {
                url: "./db4.png",
                type: "image",
                caption: "Product Page"
            },
            {
                url: "./db5.png",
                type: "image",
                caption: "About Page"
            }
        ]

    },
    {
        // threejs
        id: 5,
        title: "Project 005",
        subtitle: "ThreeJS Gallery",
        previewImg: "./threejs2.png",
        previewVideo: "./threejsbuild.mp4",

        description: "Video games have been a favorite pastime and design inspiration. It only felt right to have my first attempt working with 3D web design, an art gallery inspired by the games I remember. ",
        notes: "Explore the gallery with 'view project' in the top right corner!",

        software: "HTML, CSS, Three.JS, Adobe Dimension ",
        link: "https://threejsbuild.madebykevinlazo.com/",

        // New fields
        overview: [
            {
                title: "Features",
                content: "Users can move through an interactive experience to view a gallery of video game characters. The gallery is a 3D environment that can be navigated with mouse and keyboard. Users can move around the gallery and interact with the models to learn more about them."
            },
            {
                title: "Creative Direction",
                content: "This project was developed with two concepts in mind. The creation and design of 3D models in Adobe Dimension and the composition of the gallery in Three.JS. A framework designed to create 3D environments on the web."
            }
        ],

        technical: {
            sections: [
                {
                    title: "HTML/CSS setup",
                    content: "Three.JS setup",
                    details: [
                        "To use a Three.JS library, you need to thoroughly set up the coding environment to receive the necessary resources to render 3D objects formatted in obj or gltf.",

                        "To create a Three.JS scene, you need to create a Three.JS renderer, a Three.JS scene, and a Three.JS camera.",

                        "To create a Three.JS object, you need to create a Three.JS geometry, a Three.JS material, and a Three.JS mesh. In my case, I was using three.js to position 3D objects and use the textures to create a space / environment",

                        "To create a Three.JS light, you need to create a Three.JS light and add it to the scene. I used a point light to create a spotlight effect on the models.",
                    ]
                },
                {
                    title: "Asset Creation",
                    content: "3D Models",
                    details: [
                        "I created 3D models of the display boards in Adobe Dimension. Exporting the UV's of each model to Photoshop, where I could make edits to the textures. I could reapply the textures in Adobe Dimension, which allowed me to incorporate my design changes to the 3D models.",
                        "I downloaded 3D models from the internet of the video game characters that I was planning to center my gallery around. I used the gltf format to import the models into the Three.JS scene. I textured the models in Adobe Dimension.",
                    ]
                },
                {
                    title: "Positioning and Composing",
                    content: "Bringing the gallery to life",
                    details: [

                        "I positioned the models appropriately according to my wireframes.",
                        "I scaled the models to the appropriate size, so the models and displays were consistent with each other.",
                        "I used the Three.JS camera to position the initial view of the gallery. I used the Three.JS controls to allow the user to navigate the gallery.",
                    ]
                }
            ]
        },

        wireframes: [
            {
                image: "./wireframes/tjsw1.png",
                title: "Landing Page",
                description: "Includes a text stack breakdown, a brief overview, and a call to action.",
                fullSizeImage: "./wireframes/tjsw1.png",
            },
            {
                image: "./wireframes/tjsw2.png",
                title: "Physics",
                description: "The environment physics and layout of the gallery",
                fullSizeImage: "./wireframes/tjsw2.png",
            },
            {
                image: "./wireframes/tjsw3.png",
                title: "Physics 2",
                description: "How I wanted to compose the gallery, and what it might look like after positioning the models.",
                fullSizeImage: "./wireframes/tjsw3.png",
            },
            {
                image: "./wireframes/tsjw4.png",
                title: "Mood Board",
                description: "3D model menu, to show the user what they can see in the gallery.",
                fullSizeImage: "./wireframes/tjsw4.png",
            },
            {
                image: "./wireframes/tjsw5.png",
                title: "Model viewing page",
                description: "A page with more details about a particular model selected.",
                fullSizeImage: "./wireframes/tjsw5.png",
            }
        ],

        processSteps: [
            {
                label: "Concept",
                description: "Started by wireframing the concept in Figma. Using a perspective plugin, I was able to compose my ideal layout for the project.",
                challenges: [
                    "None at this point, just brainstorming and prototyping.",

                ],
                solutions: [
                    "Created low fidelity and high fidelity wireframes",
                    "Decided on the flow between pages for the gallery, landing page debrief, main gallery view, model selection menu, and model details page."
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Ready to move into development",

                ]
            },
            {
                label: "Asset Creation",
                description: "Started by collecting each of the models I was going to use and bringing them into Adobe Dimension. A 3D modeling software that I was familiar with.",
                challenges: [
                    "Exporting the UV's and texturing them according to the model and display information",
                    "Ensuring that the models were scaled correctly and positioned correctly in the scene.",
                    "Creating visual textures that would align with the mood of the project.",

                ],
                solutions: [
                    "Created five textured models of the displays. A unique UV texture was applied to each one.",
                    "Created five textured video game character models. Textured to accurately represent their image in the gallery.",
                    "Ensure the default positioning in the exported models was correct.",
                    "Scaled the models to the appropriate size to optimize workflow in the Three.JS scene.",
                    "Exported all the models in a format that three.js would accept - GLTF.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Ready to move into development",

                ]
            },
            {
                label: "Development",
                description: "Started by collecting each of the models I was going to use and bringing them into the Three.JS working file. Then positioning the models in the scene. I used the displays and made the models interactable with event listeners that would change the scene into a single model, with information about the model.",
                challenges: [
                    "First time working with three.js scene",
                    "Creating a navigation system for the gallery",
                    "Creating an event listener for the models",
                    "Creating a model selection menu",
                    "Creating an environment that captures the essence of a 3D gallery viewing experience."

                ],
                solutions: [
                    "Learned the basic syntax for importing GLTF models into the scene.",
                    "Learned the basic syntax for creating a Three.JS scene, camera, light, renderer, and controls.",
                    "Created a navigation system that would allow the user to choose a particular model they were interested in.",
                    "Created event listener that would trigger a change in the scene when a model was selected.",
                    "Created a gallery environment using three.js primitives.",
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Ready to move deploy",

                ]
            },
            {
                label: "Deploy",
                description: "Excited to share a playful and engaging project!",
                challenges: [
                    "Past the challenges!"

                ],
                solutions: [
                    "None at this point!"
                ],
                // resources: [
                //     {
                //         label: "Archive Research",
                //         url: "#",
                //         type: "documentation"
                //     },
                //     {
                //         label: "Lighting References",
                //         url: "#",
                //         type: "inspiration"
                //     }
                // ],
                outcomes: [
                    "Deployed onto portfolio subdomain, and shared on LinkedIn!",

                ]
            },
            // ... other process steps remain the same
        ],

        media: [
            {
                url: "./threejsbuild.mp4",
                type: "image",
                caption: "Editorial shoot"
            },
            {
                url: "./threejs1.png",
                type: "image",
                caption: "Outfit"
            },
            {
                url: "./threejs2.png",
                type: "image",
                caption: "Outfit"
            },
            {
                url: "./threejs3.png",
                type: "image",
                caption: "Outfit"
            },
            {
                url: "./threejs4.png",
                type: "image",
                caption: "Outfit"
            },

        ]

    }


];
export default PROJECTS;