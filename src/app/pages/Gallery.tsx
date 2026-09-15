import { Heart, Search } from "lucide-react";
import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { localImagePool } from "../utils/localImageLibrary";

export function Gallery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const categoryCycle = ["portrait", "fashion", "glamour", "headshot", "lifestyle", "outdoor"];
  const modelNames = [
    "Adaobi Nwosu",
    "Chioma Okafor",
    "Ifeoma Adeyemi",
    "Temiloluwa Balogun",
    "Kemi Akinola",
    "Zainab Ibrahim",
    "Aisha Bello",
    "Bolanle Ogunleye",
    "Olamide Adebayo",
    "Nneka Umeh",
    "Ruth Nwachukwu",
    "Deborah Alabi",
    "Chinelo Ekwueme",
    "Mariam Yusuf",
    "Tosin Ajayi",
    "Blessing Okoro",
    "Eniola Salami",
    "Ijeoma Okeke",
  ];

  const getClientName = (index: number) => {
    const photosPerModel = 3;
    const modelIndex = Math.floor(index / photosPerModel) % modelNames.length;
    return modelNames[modelIndex];
  };

  const galleryPhotos = localImagePool.map((url, index) => ({
    id: index + 1,
    url,
    category: categoryCycle[index % categoryCycle.length],
    likes: 180 + ((index * 37) % 420),
    clientName: getClientName(index),
  }));

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "portrait", label: "Portrait" },
    { id: "fashion", label: "Fashion" },
    { id: "glamour", label: "Glamour" },
    { id: "headshot", label: "Headshot" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "outdoor", label: "Outdoor" },
  ];

  const filteredPhotos = galleryPhotos.filter((photo) => {
    const matchesCategory = filter === "all" || photo.category === filter;
    const matchesSearch =
      searchQuery === "" ||
      photo.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Stunning transformations from our beautiful clients who chose to share their edited photos
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-8">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-white">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                {category.label}
                <Badge variant="secondary" className="ml-2">
                  {category.id === "all"
                    ? galleryPhotos.length
                    : galleryPhotos.filter((p) => p.category === category.id).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={filter} className="mt-8">
            {filteredPhotos.length > 0 ? (
              <>
                {/* Mobile: 1 column */}
                <div className="block sm:hidden">
                  <Masonry columnsCount={1} gutter="1rem">
                    {filteredPhotos.map((photo) => (
                      <Card
                        key={photo.id}
                        className="group overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-0 relative">
                          <ImageWithFallback
                            src={photo.url}
                            alt={`Photo by ${photo.clientName}`}
                            className="w-full h-auto object-cover"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <p className="font-semibold mb-1">{photo.clientName}</p>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-white/20 backdrop-blur-sm text-white capitalize">
                                  {photo.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Heart className="size-4 fill-red-500 text-red-500" />
                                  <span className="text-sm">{photo.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </Masonry>
                </div>

                {/* Tablet and Desktop: 2-3 columns */}
                <div className="hidden sm:block">
                  <Masonry columnsCount={3} gutter="1rem">
                    {filteredPhotos.map((photo) => (
                      <Card
                        key={photo.id}
                        className="group overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                      >
                        <CardContent className="p-0 relative">
                          <ImageWithFallback
                            src={photo.url}
                            alt={`Photo by ${photo.clientName}`}
                            className="w-full h-auto object-cover"
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <p className="font-semibold mb-1">{photo.clientName}</p>
                              <div className="flex items-center justify-between">
                                <Badge className="bg-white/20 backdrop-blur-sm text-white capitalize">
                                  {photo.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Heart className="size-4 fill-red-500 text-red-500" />
                                  <span className="text-sm">{photo.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </Masonry>
                </div>
              </>
            ) : (
              <Card className="text-center py-16">
                <CardContent>
                  <Search className="size-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">No photos found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Gallery Stats */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Join Our Gallery</h2>
            <p className="text-gray-600">
              Share your edited photos with the community and inspire others!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-500 mb-2">
                {galleryPhotos.length}+
              </div>
              <div className="text-gray-600">Photos Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">
                {galleryPhotos.reduce((sum, photo) => sum + photo.likes, 0).toLocaleString()}+
              </div>
              <div className="text-gray-600">Total Likes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
