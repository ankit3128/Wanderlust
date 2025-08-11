// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>WANDERLUST</title>
// </head> -->
// <% layout("layouts/boilerplate") -%>

// <div class="row mt-3">
//   <div class="col-8 offset-3">

 
//     <h3 ><%= listing.title %></h3>
// </div>
//     <div class="card col-6 offset-3 show-card">
       
//   <img src="<%= listing.image.url %>" class="card-img-top show-img mt-2 " alt="Listing_image"/>
//   <div class="card-body">
//     <p class="card-text"><i>Owned By- <%- listing.owner.username %></i></p> 
      
//     <p class="card-text"><%=listing.description%></p>
//     <p class="card-text">&#8377; <%=listing.price.toLocaleString("en-IN")%></p> 
//     <p class="card-text"><%=listing.location%></p>
//     <p class="card-text"> <%=listing.country%></p>
//     </div>
//     </div>
//    </br>
   
  
//    <div class="btns mt-2 mb-3">
//      <a href="/listing/<%=listing.id%>/edit" class=" btn btn-dark col-1 offset-3 edit-btn ">Edit</a>
//       <form method="POST" action="/listing/<%=listing._id%>?_method=DELETE">
//         <button class=" btn btn-dark offset-5">Delete</button>

//     </form>

  
//   </div>
//   <hr>
//   <div class="col-8 offset-3">
//     <h4>LEAVE A REVIEW</h4>
//     <form action="/listing/<%= listing.id %>/reviews" method="POST" novalidate class="needs-validation" >
//       <div class="mb-3 mt-3">
//         <label for="rating" class="form-label">Rating</label>
//         <input type="range" class="form-range" min="1" max="5" id="rating" name="review[rating]">
//       </div> 

//        <div class="mb-3 mt-3">
//         <label for="comment" class="form-label">Comments</label>
//         <textarea name="review[comment]" id="comment" cols="30" rows="5" class="form-control" required></textarea>

//         <div class="invalid-feedback">PLEASE SUBMIT SOME COMMENTS FOR REVIEW</div>

//       </div>
      
//       <button class="btn btn-outline-dark mb-3" >SUBMIT</button>
//     </form>
//     </div>
//     <hr>

//     <p><b>ALL REVIEWS</b></p>
// <div class="row">
//        <% for(review of listing.reviews){%>
//       <div class="card col-5 ms-3 mb-3">
//         <div class="card-body">
//           <h5 class="card_title">User name
//           <p class="card-text"><%= review.comment%></p>
//           <p class="card-text "><%= review.rating%> <i class="fa-solid fa-star" style="color:gold" ></i></p>
//           </h5>
//         </div>
//         <form class="mb-3" method="POST" action="/listing/<%=listing._id %>/reviews/<%= review._id %>?_method=DELETE">
//           <button class="btn btn-sm btn-dark mb-3"> Delete</button>
//         </form>
//       </div>
     
//       <%}%>
//       </div>
//   </div>
// </div>