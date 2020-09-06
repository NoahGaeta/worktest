"""
Program that smooths boundary data
Author: Noah Gaeta
"""
import re
import numpy
from pykml import parser
import matplotlib.pyplot as plt

REGION_FILE_PATH = '../region.kml'
SAVE_PATH = '../region_no_outliers.kml'  # lets not over write the file just in case


def main():
    coordinates = get_coordinates_kml_file(REGION_FILE_PATH)
    plot_coordinates(coordinates)  # plot original values
    coordinates = remove_outliers(coordinates)
    plot_coordinates(coordinates)  # plot values after removal of outliers
    save_coordinates_kml_file(REGION_FILE_PATH, SAVE_PATH, coordinates)
    print("New kml file saved to: ", SAVE_PATH)
    return 0


def get_kml_etree(file_path):
    """ Generate element tree from kml file """
    with open(file_path) as file:
        return parser.parse(file)


def get_coordinates_kml_file(file_path):
    """ Gets coordinates from kml file """
    root = get_kml_etree(file_path).getroot()
    coordinates = str(root.Document.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates)  # get coordinates from kml
    coordinates = re.sub(r',0', '', coordinates)  # get rid 0's we don't need them
    coordinates = coordinates.split()  # split string by space
    # split each string in coordinates list by ',' then convert each element in said list to floating point number
    return numpy.array(list(map(lambda cords: list(map(lambda cord: float(cord), cords.split(','))), coordinates)))


def save_coordinates_kml_file(load_path, save_path, coordinates):
    """  Save modified kml file """
    etree = get_kml_etree(load_path)
    root = etree.getroot()
    coords_str = format_coords_into_string(coordinates)
    root.Document.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates = coords_str
    etree.write(save_path, pretty_print=True)


def format_coords_into_string(coordinates):
    """ Formats coordinates list into original string format """
    coords_str = ''
    for coord in coordinates:
        for i in range(0, 2):
            coords_str += str(coord[i])
            if i == 1:
                coords_str += ',0 '
            else:
                coords_str += ','
    return coords_str


def plot_coordinates(coordinates):
    x, y = coordinates.T  # get x, y coordinates
    plt.scatter(x, y)
    plt.show()


def remove_outliers(coordinates):
    """ Removes outliers from coordinate list """
    x, y = coordinates.T  # split coordinates into their own lists
    outliers_x = find_outliers(x)  # find x outliers
    outliers_y = find_outliers(y)  # find y outliers
    no_outliers = []
    for coordinate in coordinates:
        # append to list only if coordinate does not contain outlier
        if coordinate[0] not in outliers_x and coordinate[1] not in outliers_y:
            no_outliers.append(coordinate)
    return numpy.array(no_outliers)


def find_outliers(flat_list):
    """ Find outliers """
    sd = numpy.std(flat_list)  # get standard deviation of the elements in the list
    mean = numpy.mean(flat_list, axis=0)  # get the mean of the elements in the list
    final_list = []
    for cord in flat_list:
        if mean + 2 * sd < cord > mean - 2 * sd:  # check if outliers
            final_list.append(cord)
    return final_list


if __name__ == '__main__':
    main()
