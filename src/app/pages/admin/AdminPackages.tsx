import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Switch } from "../../components/ui/switch";
import { Edit, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { seedPackages, type Package } from "../../../data/seedData";

export function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      // TODO: Replace with actual API call
      // Using centralized seed data for consistency
      setTimeout(() => {
        setPackages(seedPackages);
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setLoading(false);
    }
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage({ ...pkg });
  };

  const handleSavePackage = async () => {
    if (!editingPackage) return;

    try {
      // TODO: Implement API call to save package
      setPackages(
        packages.map((pkg) =>
          pkg.id === editingPackage.id ? editingPackage : pkg
        )
      );
      setEditingPackage(null);
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!editingPackage) return;
    const newFeatures = [...editingPackage.features];
    newFeatures[index] = value;
    setEditingPackage({ ...editingPackage, features: newFeatures });
  };

  const handleAddFeature = () => {
    if (!editingPackage) return;
    setEditingPackage({
      ...editingPackage,
      features: [...editingPackage.features, ""],
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPackage) return;
    setEditingPackage({
      ...editingPackage,
      features: editingPackage.features.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Package Management</h1>
          <p className="text-gray-600">
            Manage pricing packages and features
          </p>
        </div>

        {/* Edit Package Form */}
        {editingPackage && (
          <Card className="border-purple-500 border-2">
            <CardHeader>
              <CardTitle>
                Editing: {editingPackage.name} Package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Package Name</Label>
                  <Input
                    value={editingPackage.name}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Base Price (₦)</Label>
                  <Input
                    type="number"
                    value={editingPackage.price}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Photos Description</Label>
                  <Input
                    value={editingPackage.photos}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        photos: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Express Fee (₦)</Label>
                  <Input
                    type="number"
                    value={editingPackage.turnaround.express}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        turnaround: {
                          ...editingPackage.turnaround,
                          express: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Rush Fee (₦)</Label>
                  <Input
                    type="number"
                    value={editingPackage.turnaround.rush}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        turnaround: {
                          ...editingPackage.turnaround,
                          rush: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPackage.popular}
                    onChange={(e) =>
                      setEditingPackage({
                        ...editingPackage,
                        popular: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <Label>Mark as "Most Popular"</Label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Features</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddFeature}
                  >
                    <Plus className="size-4 mr-1" />
                    Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingPackage.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder="Feature description"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSavePackage} className="bg-purple-600">
                  <Save className="size-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingPackage(null)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Packages List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={pkg.popular ? "border-purple-500 border-2" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{pkg.name}</CardTitle>
                    {pkg.popular && (
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold">₦{pkg.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{pkg.photos}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-sm">Turnaround:</p>
                    <div className="text-sm space-y-1">
                      <p>Standard: {pkg.turnaround.standard} (Included)</p>
                      <p className="text-orange-600">
                        Express: +₦{pkg.turnaround.express.toLocaleString()}
                      </p>
                      <p className="text-red-600">
                        Rush: +₦{pkg.turnaround.rush.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-2">Features:</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-gray-400">
                          +{pkg.features.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleEditPackage(pkg)}
                  >
                    <Edit className="size-4 mr-2" />
                    Edit Package
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}