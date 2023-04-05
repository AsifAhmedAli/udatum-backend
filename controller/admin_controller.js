const conn = require("../conn/conn");

const  verifyUser = async (req, res) => {

    
    try {
        const id = req.params.id;

        // Check if user exists
        conn.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
          if (err) {
            // console.log(err);
            res.status(500).json({message:err.message});
          } else if (results.length === 0) {
            res.status(404).json({message:`User ${id} not found`});
          } else if (results[0].status1 === 1) {
            res.status(400).json({message:`User ${id} has already been approved by admin`});
          } else {
            // Update User Status to 1 (approved)
            conn.query('UPDATE users SET status1 = 1 WHERE id = ?', [id], (err, results) => {
              if (err) {
                // console.log(err);
                res.status(500).json({message:err.message});
              } else {
                res.status(200).json({message:`User ${id} has been approved by admin`});
              }
            });
          }
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({error:error.message});
    }

};

// const get_all_doctors =  (req, res) => {
//     // Pagination variables
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   const offset = (page - 1) * limit;
//     conn.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
//         if (err) {
//         //   console.log(err);
//           res.status(500).send('Server Error');
//         } else if (results.length === 0) {
//           res.status(404).send('No users found');
//         } else {
//           const users = results;
      
//           conn.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
//             if (err) {
//               console.log(err);
//               res.status(500).send('Server Error');
//             } else {
//               const total = result[0].total;
//               const data = {
//                 users,
//                 totalUsers: total,
//                 currentPage: page,
//                 totalPages: Math.ceil(total / limit)
//               };
//               res.send(data);
//             }
//           });
//         }
//       });
      
//     }

const get_all_doctors = (req, res) => {
    // Pagination variables
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
  
    conn.query('SELECT * FROM users LIMIT ? OFFSET ?', [limit, offset], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err.message
        });
      } else if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No doctors found'
        });
      } else {
        const doctors = results;
  
        conn.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              success: false,
              message: err.message
            });
          } else {
            const total = result[0].total;
            const data = {
              doctors,
              totalDoctors: total,
              currentPage: page,
              totalPages: Math.ceil(total / limit)
            };
            res.json({
              success: true,
              message: 'Successfully retrieved all doctors',
              data: data
            });
          }
        });
      }
    });
  };

  const block_doctor_account = (req, res) => {
    const id = req.params.id;
    
    conn.query('UPDATE users SET status1 = 0 WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Server Error'
        });
      } else if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'User has been successfully blocked'
        });
      }
    });
  };
  
  


module.exports = {verifyUser,get_all_doctors,block_doctor_account}
