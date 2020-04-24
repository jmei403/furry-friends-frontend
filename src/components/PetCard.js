import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewLike, deleteMyLike } from '../adapters/LikesAdapter';
import LikeButton from './LikeButton';

const PetCard = ({ likeId, petObject, addNewLike, myLikes, deleteMyLike }) => {
  let imgUrl, petId
  console.log(likeId)
  petObject.primary_photo_cropped ? imgUrl = petObject.primary_photo_cropped.small : imgUrl = ''
  petObject.pet_api_id ? petId = petObject.pet_api_id : petId = petObject.id

  const like = () => {
    addNewLike(petObject);
  }

  const unlike = () => {
    deleteMyLike(likeId);
  }

  return (
    <div className='PetCard' id={petObject.id}>
      <div className='pet-image-container'>
        <img className='pet-image' alt={petObject.name} src={imgUrl}></img>
      </div>
      <div className='pet-card-details'>
        <div className='pet-info'>
          <h3>{petObject.name}</h3>
          { petObject.breeds.secondary ? <p>{petObject.breeds.primary} / {petObject.breeds.secondary}</p> : <p>{petObject.breeds.primary}</p> }
        </div>

        <button onClick={like} className='pet-save-button'>Like</button>
        <button onClick={unlike} className='pet-remove-button'>Unlike</button>
        <LikeButton pet={petObject} />
        <button className='pet-details-button'>
          <span className='pet-card-link'>
            <Link to={`/pets/${petId}`}>Details</Link>
          </span>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = ({ myLikes }) => {
  return {
    myLikes
  }
}

export default connect(mapStateToProps, { addNewLike, deleteMyLike })(PetCard);
