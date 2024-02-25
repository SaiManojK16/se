import React, { useState, useRef } from 'react';
import './Profile.css'; // Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Profile = () => {
  const defaultName = 'Sai Manoj Kartala';
  const defaultDescription = `Hey, I'm Sai Manoj Kartala, an international graduate student immersing myself in the captivating world of computer science at the University at Albany.  
  My academic journey kicked off at the esteemed Gandhi Institute of Technology and Management, carving out a solid foundation for my major in Computer and Information Science.  
  What fuels my excitement are the realms of machine learning, software engineering, and artificial intelligence. 
  Known for my hands-on approach and a keen eye on the latest tech trends, I'm not just here for the academic ride; 
  I'm on a mission to actively contribute and make a tangible impact in the ever-evolving landscape of technology. Albany is not just a stop for degrees; it's a canvas where my passion for innovation and commitment to the dynamic world of tech take center stage.`;

  const defaultImageUrl =
    'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*YqfVlyCe06DfcPsR3kpYrw.jpeg';

  const [name, setName] = useState(defaultName);
  const [description, setDescription] = useState(defaultDescription);
  const [isEditing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedDescription, setEditedDescription] = useState(description);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleDoubleClick = (type) => {
    setEditing(true);
    if (type === 'name') {
      setEditedName(name);
      nameRef.current.focus();
    } else if (type === 'description') {
      setEditedDescription(description);
      descriptionRef.current.focus();
    }
  };

  const handleSave = (type) => {
    setEditing(false);
    if (type === 'name') {
      setName(editedName);
    } else if (type === 'description') {
      setDescription(editedDescription);
    }
  };

  const handleKeyDown = (event, type) => {
    if (event.key === 'Enter') {
      handleSave(type);
    }
  };

  return (
    <div className="container mt-5">
      <div className="profile-container">
        <div className="profile-image">
        <img
            src={defaultImageUrl}
            alt="Profile"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <div className="profile-details">
          <div className="details-top">
            <div>
              <h2
                onDoubleClick={() => handleDoubleClick('name')}
                onBlur={() => handleSave('name')}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                contentEditable={isEditing}
                suppressContentEditableWarning
                ref={nameRef}
                className="mb-3"
              >
                {isEditing ? editedName : name}
              </h2>
            </div>
            <div>
              <p
                onDoubleClick={() => handleDoubleClick('description')}
                onBlur={() => handleSave('description')}
                onKeyDown={(e) => handleKeyDown(e, 'description')}
                contentEditable={isEditing}
                suppressContentEditableWarning
                ref={descriptionRef}
              >
                {isEditing ? editedDescription : description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
