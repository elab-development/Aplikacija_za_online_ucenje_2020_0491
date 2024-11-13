import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseVideosPage.css';

const CourseVideosPage = () => {
    const { id } = useParams(); // Dohvatam ID-a kursa iz URL-a
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/sviKlipoviKursa/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, [id]);

    const convertToEmbedLink = (link) => {
        // Proveri da li je link sa YouTube-a
        if (link.includes("youtube.com/watch?v=")) {
            const videoId = link.split("v=")[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // Proveri da li je link sa YouTube skraćenog formata
        if (link.includes("youtu.be/")) {
            const videoId = link.split("youtu.be/")[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        // Dodaj sličnu logiku za Vimeo ili druge platforme, ako je potrebno
        return link; // Vrati originalan link ako nije YouTube
    };

    return (
        <div className="course-videos-page">
            <h2>Video snimci kursa</h2>
            <div className="videos-list">
                {videos.map(video => (
                    <div key={video.id} className="video-item">
                        <h3>{video.title}</h3>
                        <div className="video-embed">
                            <iframe
                                src={convertToEmbedLink(video.link)}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
               
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseVideosPage;
