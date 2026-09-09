using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace SimpleLegacyApp.Tests
{
    [TestClass]
    public class SampleDataSerializationTests
    {
        [TestMethod]
        public void Serialize_And_Deserialize_RoundTrips_SampleData()
        {
            var original = new SimpleLegacyApp.SampleData
            {
                Id = 42,
                Name = "Neo"
            };

            var bytes = SimpleLegacyApp.Serialization.Serialize(original);
            var roundTripped = SimpleLegacyApp.Serialization.Deserialize<SimpleLegacyApp.SampleData>(bytes);

            Assert.AreEqual(original.Id, roundTripped.Id);
            Assert.AreEqual(original.Name, roundTripped.Name);
        }
    }
}
