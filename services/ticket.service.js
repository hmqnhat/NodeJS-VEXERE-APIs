const { Ticket } = require("../models/ticket.model");
const { User } = require("../models/user.model");
const { Trip } = require("../models/trip.model");
const { Seat } = require("../models/seat.model");
const { sendBookTicketEmail } = require("../email/sendBookTicketEmail");

//book ticket
//body(DTO): seatCodes, tripID,
//token -> userId
module.exports.createTicket = (req, res, next) => {
  const userId = req.user._id;
  const { tripId, seatCodes } = req.body;

  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) {
        return Promise.reject({
          status: 404,
          message: "Trip not found!!",
        });
      }

      const availabelSeatCodes = trip.seats
        .filter((seat) => !seat.isBooked)
        .map((seat) => seat.code);
      const errSeatCodes = [];
      seatCodes.forEach((code) => {
        if (availabelSeatCodes.indexOf(code) === -1) errSeatCodes.push(code);
      });

      if (errSeatCodes.length > 0) {
        return Promise.reject({
          status: 400,
          message: `Seat ${errSeatCodes.join(", ")} is/are not avalable`,
        });
      }

      seatCodes.forEach((code) => {
        const index = trip.seats.findIndex((seat) => seat.code === code);
        trip.seats[index].isBooked = true;
      });

      return Promise.all([
        Ticket.create({
          tripId,
          userId,
          seats: seatCodes.map((code) => new Seat({ code })),
          totalPrice: seatCodes.length * trip.Price,
        }),
        trip.save(),
      ]);
    })
    .then((result) => {
      console.log(result);
      const [ticket, trip] = result;

      sendBookTicketEmail();

      return res.status(200).json(ticket);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
