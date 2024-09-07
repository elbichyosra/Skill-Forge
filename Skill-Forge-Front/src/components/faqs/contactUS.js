import React, { useState } from 'react';
import axios from 'axios';
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`;

// Styled response message
const ResponseMessage = styled.p`
  ${tw`mt-4 font-medium`}
  ${({ success }) => success ? tw`text-green-500` : tw`text-red-500`}
`;

const ContactUsForm = ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "We would love to hear from you. Please fill out the form and we'll get back to you shortly.",
  submitButtonText = "Send",
  textOnLeft = true,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/contact/message', formData);
      if (response.data.success) {
        setResponseMessage('Message sent successfully!');
        setSuccess(true);
        // Reset form fields
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        // Clear the message after 5 seconds
        setTimeout(() => {
          setResponseMessage('');
        }, 5000);
      } else {
        setResponseMessage('Message sending failed!');
        setSuccess(false);
        setTimeout(() => {
          setResponseMessage('');
        }, 2000);
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again.');
      setSuccess(false);
      setTimeout(() => {
        setResponseMessage('');
      }, 2000);
    }
  };

  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc={EmailIllustrationSrc} />
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {subheading && <Subheading>{subheading}</Subheading>}
              <Heading>{heading}</Heading>
              {description && <Description>{description}</Description>}
              <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required />
                <Input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                <Input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                <Textarea name="message" placeholder="Your Message Here" value={formData.message} onChange={handleChange} required />
                <SubmitButton type="submit">{submitButtonText}</SubmitButton>
              </Form>
              {responseMessage && <ResponseMessage success={success}>{responseMessage}</ResponseMessage>}
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};

export default ContactUsForm;
