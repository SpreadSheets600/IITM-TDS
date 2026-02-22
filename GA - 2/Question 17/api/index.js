export default function handler(req, res) {
	if (req.method !== "GET") {
		res.setHeader("Allow", "GET");
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	return res.status(200).json({
		message: "Hello from the IITM TDS Vercel function.",
		email: "24f2008474@ds.study.iitm.ac.in",
	});
}
