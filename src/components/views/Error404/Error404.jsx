import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
    return (
        <div>
            <div className="text-center">
                <img
                    alt="404 page - What a Story"
                    src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif"
                    srcSet="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 320w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 400w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 450w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 640w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 700w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 800w, 
                    https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif 768w" 
                    sizes="(max-width: 919px) 100vw, max(768px, 98vh)"
                    loading="lazy"
                    className="mx-auto"
                />
            </div>
            <div className="text-center">
                <h2>Parece que hubo un error😢</h2>
                <Link to='/' className="btn btn-primary btn-lg mt-3 text-decoration-none">Ir a la página principal</Link>
            </div>
        </div>
    );
};

export default Error404;
