import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SectionHeading } from 'components/misc/Headings.js';
import { Container, ContentWithPaddingXl } from 'components/misc/Layouts.js';

// Adjust the path to your images folder
const image1 = require('../../images/image1.jpg');
const image2 = require('../../images/image2.jpg');
const image3 = require('../../images/image3.jpg');
const image4 = require('../../images/image4.jpg');
const image5 = require('../../images/image5.jpg');
const image6 = require('../../images/image6.jpg');

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;

const Image = styled(motion.div)((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-center rounded`,
  props.imageSrc ? '' : 'background-color: #ccc;', // Fallback background color if image fails
]);

const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``;

export default function TrendingBlogs() {
  // Animation for post background on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: '100%',
    },
    hover: {
      backgroundSize: '110%',
    },
  };

  // Popular posts using local images and updated content
  const popularPosts = [
    {
      postImageSrc: image2,
      title: 'Cloud Computing',
      description: 'The three main types of cloud computing include Infrastructure as a Service, Platform as a Service, and Software as a Service. Each type offers different levels of control, flexibility, and management.',
      url: '#',
    },
    {
      postImageSrc: image1,
      title: 'IT Consulting',
      description: 'To succeed in your IT project, CIAM helps you choose the adaptable strategy and accompanies you through various stages, from strategic planning to change management.',
      url: '#',
    },
  ];

  const recentPosts = [
    {
      postImageSrc: image5,
      title: 'Infrastructure & Management',
      description: 'CIAM provides the cloud infrastructure you need, allowing you to deploy workloads globally with ease, ensuring low-latency performance.',
      url: '#',
    },
    {
      postImageSrc: image4,
      title: 'Software Integration',
      description: 'CIAM ensures smooth integration of subsystems into a unified system, saving time and resources while ensuring optimal functionality.',
      url: '#',
    },
    {
      postImageSrc: image3,
      title: 'Collaboration Tools for Tech Teams',
      description: 'Effective collaboration tools are essential for remote tech teams. Explore the best solutions for enhancing productivity and team communication.',
      url: '#',
    },
    {
      postImageSrc: image6,
      title: 'Mastering Full Stack Development',
      description: 'Become a full-stack developer with the right tools and technologies. Learn how to build and manage both front-end and back-end applications.',
      url: '#',
    },
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>Trending Tech Blogs</Heading>
            <PostsContainer>
              {popularPosts.map((post, index) => (
                <Post
                  key={index}
                  href={post.url}
                  className="group"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <Image
                    transition={{ duration: 0.3 }}
                    variants={postBackgroundSizeAnimation}
                    imageSrc={post.postImageSrc}
                  />
                  <Title>{post.title}</Title>
                  <Description>{post.description}</Description>
                </Post>
              ))}
            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Recent Tech Blogs</Heading>
            <PostsContainer>
              {recentPosts.map((post, index) => (
                <Post key={index} href={post.url} className="group">
                  <PostTextContainer>
                    <Title>{post.title}</Title>
                    <Description>{post.description}</Description>
                  </PostTextContainer>
                  <Image imageSrc={post.postImageSrc} />
                </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
}
