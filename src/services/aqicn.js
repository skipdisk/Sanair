const aqicnService = async (search, signal) => {
  const aqicnKey = "4f098571172a506543f17ef51471782f0c50714f";

  const res = await fetch(
    `https://api.waqi.info/search/?token=${aqicnKey}&keyword=${search}`,
    { signal: signal }
  );

  return res;
};

export default aqicnService;
