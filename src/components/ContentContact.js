import { useState } from 'react';
import Footer from './Footer';

function ContentContact() {

    const [ sent, setSent ] = useState(false);

    function sendMessage(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const submission = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        fetch('https://www.iancomposer.com:3002/submitmessage', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: submission.name, email: submission.email, message: submission.message})
        }).then(response => {
            if (response.status === 200) {
                setSent(true);
                console.log('success');
            }
        });
    }

    return (
        <>
            <div id="content">
                <div id="contactDiv">
                    { !sent ? (
                            <>
                                <p>
                                    Please fill out this contact form with any questions or comments and we
                                    will get back to you as soon as possible!
                                </p>
                                <form id="contactForm" method="POST" action="send" encType="multipart/form-data" onSubmit={sendMessage}>
                                    <label htmlFor="name">Name/Organization:</label>
                                    <input type="text" name="name" required />
                                    <label htmlFor="email">Email address:</label>
                                    <input type="email" name="email" required />
                                    <label htmlFor="message">Message:</label>
                                    <textarea name="message" rows="7" required />
                                    <button className="submitButton" type="submit" value="submit">Submit</button>
                                </form>
                            </>
                        ) : (
                            <p>Your message has been successfully sent. Thanks for reaching out!</p>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ContentContact;