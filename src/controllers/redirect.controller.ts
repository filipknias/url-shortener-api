import { Router } from "express";
import Url from "../models/Url";
import View from "../models/View";
import IP from 'ip';

const router: Router = Router();

// GET /:short_url
// Redirect user to long url website
router.get("/:short_url", async (req, res) => {
  try {
    const short_url = req.params.short_url;
    const url = await Url.findOne({ short_url });
    if (url === null) {
      return res.json({ success: false, message: `Url with short_url: ${short_url} not found` }).status(404);
    }
    // Register IP address website view
    const ipAddress = IP.address();
    // IP address database lookup
    const ipAddressPresent = await View.findOne({ ip_address: ipAddress, url_id: url._id });
    if (!ipAddressPresent) {
      const view = new View({ ip_address: ipAddress, url_id: url._id });
      await view.save();
    }
    res.redirect(`https://${url.long_url}`);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error }).status(500);
  }
})

export default router;